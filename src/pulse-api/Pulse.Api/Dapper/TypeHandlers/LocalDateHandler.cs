using System.Data;
using Dapper;
using NodaTime;

namespace Pulse.Api.Dapper.TypeHandlers;

internal sealed class LocalDateHandler : SqlMapper.TypeHandler<LocalDate>
{
    private LocalDateHandler() { }

    public static readonly LocalDateHandler Default = new();

    public override void SetValue(IDbDataParameter parameter, LocalDate value)
    {
        parameter.Value = value;
    }

    public override LocalDate Parse(object value) =>
        value switch
        {
            LocalDate date => date,
            DateTime dateTime => LocalDate.FromDateTime(dateTime),
            _ => (LocalDate)value
        };
}
