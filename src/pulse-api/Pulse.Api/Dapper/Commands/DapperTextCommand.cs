using System.Data;

namespace Pulse.Api.Dapper.Commands;

public abstract class DapperTextCommand : IDapperCommand
{
    public CommandType CommandType => CommandType.Text;
    public object Parameters { get; set; } = null!;
    public abstract string Text { get; }
    public virtual int Timeout => 180;
}
