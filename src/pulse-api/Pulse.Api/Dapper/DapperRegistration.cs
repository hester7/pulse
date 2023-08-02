using Dapper;
using Pulse.Api.Dapper.TypeHandlers;

namespace Pulse.Api.Dapper;

public static class DapperRegistration
{
    public static IServiceCollection AddDapper(this IServiceCollection services, string connectionString)
    {
        SqlMapper.AddTypeHandler(InstantHandler.Default);
        SqlMapper.AddTypeHandler(LocalDateHandler.Default);
        SqlMapper.AddTypeHandler(LocalDateTimeHandler.Default);

        DefaultTypeMap.MatchNamesWithUnderscores = true;

        return services.AddSingleton(_ => new DapperExecutor(connectionString));
    }
}
