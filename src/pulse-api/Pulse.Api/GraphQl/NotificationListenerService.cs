using System.Text.Json;
using HotChocolate.Subscriptions;
using Npgsql;
using Pulse.Api.Application.Extensions;
using Pulse.Api.Application.Json;

namespace Pulse.Api.GraphQl;

internal sealed class NotificationListenerService : BackgroundService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger _logger;
    private readonly ITopicEventSender _topicEventSender;

    public NotificationListenerService(IConfiguration configuration, ILogger logger, ITopicEventSender topicEventSender)
    {
        _configuration = configuration;
        _logger = logger;
        _topicEventSender = topicEventSender;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var connectionString = _configuration.GetConnectionString("SqlConnection");
        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(stoppingToken);

        connection.Notification += async (_, e) =>
        {
            try
            {
                var dictionary = JsonSerializer.Deserialize<Dictionary<string, object>>(e.Payload)!;

                var table = dictionary["table"].ToString()!;
                var rowJson = JsonSerializer.Serialize(dictionary["row"]);

                var (model, modelType) = GetModel(table, rowJson);

                var sendAsyncMethod = _topicEventSender.GetType().GetMethod("SendAsync");
                var genericSendAsyncMethod = sendAsyncMethod!.MakeGenericMethod(modelType);

                var sendAsyncResult = genericSendAsyncMethod.Invoke(_topicEventSender,
                new[]
                {
                    modelType.Name,
                    model,
                    stoppingToken
                });

                if (sendAsyncResult is ValueTask valueTask)
                    await valueTask.AsTask();
            }
            catch (Exception ex)
            {
                _logger.Error("An unhandled exception occurred while handling a database notification event: {ex}", ex);
            }
        };

        await using (var command = new NpgsqlCommand("LISTEN notification", connection))
        {
            await command.ExecuteNonQueryAsync(stoppingToken);
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            // Thread will block here until a notification is received
            await connection.WaitAsync(stoppingToken);
        }
    }

    private static (object model, Type modelType) GetModel(string table, string rowJson)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = new LowerSnakeCaseNamingPolicy(),
            Converters = { new InstantConverter("yyyy-MM-dd'T'HH:mm:ss.FFFFFF+00:00"), }
        };

        var modelTypeName = $"Pulse.Api.Domain.Models.{table.ToModelName()}";
        var modelType = Type.GetType(modelTypeName + ", Pulse.Api")!;
        var model = JsonSerializer.Deserialize(rowJson, modelType, options)!;

        return (model, modelType);
    }
}
