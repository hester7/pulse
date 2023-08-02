using System.Data;
using Dapper;
using NodaTime;

namespace Pulse.Api.Dapper.TypeHandlers;

internal sealed class LocalDateTimeHandler : SqlMapper.TypeHandler<LocalDateTime>
{
    private LocalDateTimeHandler() { }

    public static readonly LocalDateTimeHandler Default = new();

    public override void SetValue(IDbDataParameter parameter, LocalDateTime value)
    {
        parameter.Value = value;
    }

    public override LocalDateTime Parse(object value) => (LocalDateTime)value;
}
