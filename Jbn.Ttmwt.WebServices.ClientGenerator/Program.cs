using System;
using System.IO;
using System.Reflection;

namespace Jbn.Ttmwt.WebServices.ClientGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var appSwaggerDocUri = "http://localhost:55214/swagger/v0/swagger.json";

            GenerateTypeScriptClient(appSwaggerDocUri,
                @"..\..\..\..\Jbn.Ttmwt.App\src\api-client.ts");
        }

        static void GenerateTypeScriptClient(string swaggerUrl, string relativeOutputPath)
        {
            var swaggerToReact = new SwaggerToReact()
            {
                SwaggerUrl = swaggerUrl,
                //EnumsToReplace = new Dictionary<string, string>(),
                //EnumsToNormalize = new List<string>()
            };

            var basePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var code = swaggerToReact.GenerateCode();// basePath);
            SaveTextFileRelative(relativeOutputPath, code);
        }

        static void SaveTextFileRelative(string relativeOutputPath, string code)
        {
            var basePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var destinationPath = Path.Combine(basePath, relativeOutputPath);
            SaveTextFile(destinationPath, code);
        }

        static void SaveTextFile(string path, string content)
        {
            using (var sw = File.CreateText(path))
            {
                sw.Write(content);
            }
        }
    }
}
