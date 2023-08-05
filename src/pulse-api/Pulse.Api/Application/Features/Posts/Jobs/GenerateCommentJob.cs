using Pulse.Api.Application.Features.Posts.Commands;
using Pulse.Api.Dapper;
using Pulse.Api.Domain.Models;
using Quartz;

namespace Pulse.Api.Application.Features.Posts.Jobs;

internal sealed class GenerateCommentJob : IJob
{
    private readonly DapperExecutor _executor;
    public static readonly JobKey JobKey = new(nameof(GenerateCommentJob));
    public static readonly string JobDataKey = nameof(Comment);

    public GenerateCommentJob(DapperExecutor executor)
    {
        _executor = executor;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        if (context.MergedJobDataMap.Get(JobDataKey) is Comment comment)
        {
            await Task.Delay(Random.Shared.Next(0, 20_000));
            await _executor.ExecuteAsync(new InsertCommentCommand(comment));
        }
    }
}