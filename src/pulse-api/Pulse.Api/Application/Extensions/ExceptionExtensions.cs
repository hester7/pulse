namespace Pulse.Api.Application.Extensions;

public static class ExceptionExtensions
{
    public static string[] GetExceptionMessages(this Exception exception)
    {
        var messages = new List<string> { exception.Message };

        if (exception.InnerException != null)
            messages.AddRange(GetExceptionMessages(exception.InnerException));

        return messages.ToArray();
    }
}
