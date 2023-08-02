using System.Text.Json;
using System.Text.Json.Serialization;
using NodaTime;
using NodaTime.Text;

namespace Pulse.Api.Application.Json;

public sealed class InstantConverter : JsonConverter<Instant>
{
    private readonly string _pattern;

    public InstantConverter() : this(null)
    {
    }

    public InstantConverter(string? pattern = null)
    {
        pattern ??= InstantPattern.General.PatternText;
        _pattern = pattern;
    }

    public override Instant Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var str = reader.GetString();
        if (string.IsNullOrWhiteSpace(str))
            return default;

        var pattern = InstantPattern.CreateWithInvariantCulture(_pattern);
        var result = pattern.Parse(str);
        if (result.Success)
            return result.Value;

        throw new JsonException($"Error parsing Instant. Input: '{str}', Pattern: '{_pattern}', Error: '{result.Exception.Message}'");
    }

    public override void Write(Utf8JsonWriter writer, Instant value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_pattern, null));
    }
}
