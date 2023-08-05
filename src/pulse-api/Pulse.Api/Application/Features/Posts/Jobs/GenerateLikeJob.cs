using Pulse.Api.Application.Features.Posts.Commands;
using Pulse.Api.Dapper;
using Pulse.Api.Domain.Models;
using Quartz;

namespace Pulse.Api.Application.Features.Posts.Jobs;

internal sealed class GenerateLikeJob : IJob
{
    private readonly DapperExecutor _executor;
    public static readonly JobKey JobKey = new(nameof(GenerateLikeJob));
    public static readonly string JobDataKey = nameof(Like);

    public GenerateLikeJob(DapperExecutor executor)
    {
        _executor = executor;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        if (context.MergedJobDataMap.Get(JobDataKey) is Like like)
        {
            await Task.Delay(Random.Shared.Next(0, 20_000));
            await _executor.ExecuteAsync(new InsertLikeCommand(like));
        }
    }
}