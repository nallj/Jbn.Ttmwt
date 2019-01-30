using NJsonSchema.CodeGeneration.TypeScript;
using NSwag;
using NSwag.CodeGeneration.OperationNameGenerators;
using NSwag.CodeGeneration.TypeScript;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.ClientGenerator
{
    class SwaggerToReact
    {

        public string SwaggerUrl { get; set; }

        /// <summary>
        /// Removes all code for keys, and replaces any references with values.
        /// Necessary because for every reused enum and new instance is created.
        /// </summary>
        //public Dictionary<string, string> EnumsToReplace { get; set; }

        /// <summary>
        /// Unfortunately NSwag is built on version 2.0.0 of the Swagger API which only supports string-based enums.  Once
        /// NSwag upgrades the Swagger API to 2.2.0 number-based enums will be supported and this functionality can be removed.
        /// Issue fixed (but not implemented in NSwag) here: https://github.com/swagger-api/swagger-codegen/pull/2508
        /// </summary>
        //public List<string> EnumsToNormalize { get; set; }

        public string GenerateCode()//string basePath)
        {
            var doc = Task.Run(async () => await GetSwaggerDocAsync()).Result;

            var settings = new SwaggerToTypeScriptClientGeneratorSettings()
            {
                ClassName = "{controller}ApiClient",
                GenerateClientClasses = true,
                GenerateDtoTypes = true,
                OperationNameGenerator = new MultipleClientsFromOperationIdOperationNameGenerator(),
                PromiseType = PromiseType.Promise,
                Template = TypeScriptTemplate.Fetch,
                //WrapResponses = true // With a SwaggerResponse class.
            };

            //var extensionPath = Path.Combine(basePath, "TsClientExtensionCode.ts");
            //settings.TypeScriptGeneratorSettings.ExtensionCode = File.ReadAllText(extensionPath);
            //settings.TypeScriptGeneratorSettings.ExtendedClasses = new string[] { "ApiClient" };

            settings.TypeScriptGeneratorSettings.GenerateCloneMethod = false;
            settings.TypeScriptGeneratorSettings.MarkOptionalProperties = true;
            settings.TypeScriptGeneratorSettings.TypeScriptVersion = 2.7m;
            settings.TypeScriptGeneratorSettings.TypeStyle = TypeScriptTypeStyle.Interface;

            var generator = new SwaggerToTypeScriptClientGenerator(doc, settings);
            var code = generator.GenerateFile();

            var removeAnnoyingBaseApiAndVerRegex = new Regex(@"apiv\d+", RegexOptions.IgnoreCase);

            code = removeAnnoyingBaseApiAndVerRegex.Replace(code, "");
            //code = ReplaceEnums(code);
            //code = NormalizeEnums(code);
            //code = ReplaceExtraLineBreaks(code);

            return code;
        }

        private async Task<SwaggerDocument> GetSwaggerDocAsync()
        {
            if (string.IsNullOrWhiteSpace(SwaggerUrl))
            {
                throw new Exception("No Swagger URL was provided.");
            }
            return await SwaggerDocument.FromUrlAsync(SwaggerUrl);
        }

        //private string ReplaceEnums(string code)
        //{
        //    if (EnumsToReplace == null || !EnumsToReplace.Any()) return code;

        //    var enumRemovalReText = string.Join("|", EnumsToReplace.Keys.Select(x => @"(^export enum " + x + @" \{.*?\}$)"));
        //    code = Regex.Replace(code, enumRemovalReText, "", RegexOptions.Multiline | RegexOptions.Singleline);
        //    foreach (var kvp in EnumsToReplace)
        //    {
        //        // because an enum could be the same as property value, only ones preceded by a :, indicating a type are replaced
        //        code = Regex.Replace(code, $@"(?<=:\s*)\b{kvp.Key}\b", kvp.Value);
        //    }
        //    return code;
        //}

        /// <summary>
        /// Remove string value so that enumerated values are number-based.
        /// </summary>
        //private string NormalizeEnums(string code)
        //{
        //    if (EnumsToNormalize == null || !EnumsToNormalize.Any()) return code;

        //    foreach (var e in EnumsToNormalize)
        //    {
        //        var enumRemovalReText = @"^export enum " + e + @" \{.*?\}$";
        //        var foundEnum = Regex.Match(code, enumRemovalReText, RegexOptions.Multiline | RegexOptions.Singleline);

        //        var stringValueRemovalRegex = @"\s*=\s*""[^""]*""\s*,"; // @"\s*=\s*<any>\s*""[^""]*""\s*,";
        //        var fixedEnum = Regex.Replace(foundEnum.Value, stringValueRemovalRegex, ",", RegexOptions.Multiline | RegexOptions.Singleline);

        //        code = Regex.Replace(code, enumRemovalReText, fixedEnum, RegexOptions.Multiline | RegexOptions.Singleline);
        //    }

        //    return code;
        //}

        /// <summary>
        /// After replacing enums extra line breaks show up, so this cleans stuff up.
        /// </summary>
        //private string ReplaceExtraLineBreaks(string code)
        //{
        //    code = Regex.Replace(code, @"^\n(^\n{2,})", "\n", RegexOptions.Multiline);
        //    return code;
        //}


    }
}
