using System.Data;

namespace Pulse.Api.Dapper.Commands;

public interface IDapperCommand
{
    CommandType CommandType { get; }
    object Parameters { get; set; }
    string Text { get; }
    int Timeout { get; }
}
