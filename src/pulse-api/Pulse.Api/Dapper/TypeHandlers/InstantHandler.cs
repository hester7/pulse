using System.Data;
using Dapper;
using NodaTime;

namespace Pulse.Api.Dapper.TypeHandlers;

internal sealed class InstantHandler : SqlMapper.TypeHandler<Instant>
{
    private InstantHandler() { }

    public static readonly InstantHandler Default = new();

    public override void SetValue(IDbDataParameter parameter, Instant value)
    {
        parameter.Value = value;
    }

    public override Instant Parse(object value) => (Instant)value;
}
