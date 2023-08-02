using System.Text.Json;
using System.Text.RegularExpressions;

namespace Pulse.Api.Application.Json;

public sealed class LowerSnakeCaseNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        if (string.IsNullOrEmpty(name))
            return name;

        var startUnderscores = Regex.Match(name, @"^_+");
        var words = Regex.Matches(name, @"([A-Z][a-z]+)|([A-Z]+(?=([A-Z][a-z])|$))|[a-z]+");
        var snakeCase = string.Join("_", words.Select(m => m.Value.ToLowerInvariant()));
        return startUnderscores + snakeCase;
    }
}
