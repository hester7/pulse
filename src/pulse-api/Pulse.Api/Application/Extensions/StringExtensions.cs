namespace Pulse.Api.Application.Extensions;

public static class StringExtensions
{
    public static string ToModelName(this string tableName)
    {
        var words = tableName.Split('_');
        var modelNameWords = words.Select(w => char.ToUpperInvariant(w[0]) + w[1..]).ToArray();
        var modelName = string.Concat(modelNameWords);

        if (modelName.EndsWith("s"))
            modelName = modelName[..^1];

        return modelName;
    }
}
