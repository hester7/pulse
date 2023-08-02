using Dapper;
using Npgsql;
using Pulse.Api.Dapper.Commands;

namespace Pulse.Api.Dapper;

public sealed class DapperExecutor
{
    private readonly string _connectionString;

    public DapperExecutor(string connectionString)
    {
        _connectionString = connectionString;
    }

    private async Task<NpgsqlConnection> GetConnectionAsync()
    {
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(_connectionString);
        dataSourceBuilder.UseNodaTime();
        var dataSource = dataSourceBuilder.Build();
        var connection = await dataSource.OpenConnectionAsync();
        return connection;
    }

    private static CommandDefinition GetDefinition(IDapperCommand command, CancellationToken cancellationToken) =>
        new(command.Text, command.Parameters, commandTimeout: command.Timeout, commandType: command.CommandType, cancellationToken: cancellationToken);

    public async Task<int> ExecuteAsync(CommandDefinition definition)
    {
        await using var connection = await GetConnectionAsync();
        return await connection.ExecuteAsync(definition);
    }

    public async Task<int> ExecuteAsync(IDapperCommand command, CancellationToken cancellationToken = default) =>
        await ExecuteAsync(GetDefinition(command, cancellationToken));

    public async Task<T> ExecuteScalarAsync<T>(CommandDefinition definition)
    {
        await using var connection = await GetConnectionAsync();
        return await connection.ExecuteScalarAsync<T>(definition);
    }

    public async Task<T> ExecuteScalarAsync<T>(IDapperCommand command, CancellationToken cancellationToken = default) =>
        await ExecuteScalarAsync<T>(GetDefinition(command, cancellationToken));

    public async Task<IEnumerable<T>> QueryAsync<T>(CommandDefinition definition)
    {
        await using var connection = await GetConnectionAsync();
        return await connection.QueryAsync<T>(definition);
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(IDapperCommand command, CancellationToken cancellationToken = default) =>
        await QueryAsync<T>(GetDefinition(command, cancellationToken));

    public async Task<T> QueryRowAsync<T>(CommandDefinition definition)
    {
        await using var connection = await GetConnectionAsync();
        return await connection.QueryFirstOrDefaultAsync<T>(definition);
    }

    public async Task<T> QueryRowAsync<T>(IDapperCommand command, CancellationToken cancellationToken = default) =>
        await QueryRowAsync<T>(GetDefinition(command, cancellationToken));
}