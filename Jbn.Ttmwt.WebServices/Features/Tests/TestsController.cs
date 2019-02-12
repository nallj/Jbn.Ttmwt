using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    [Route("api")]
    public class TestsController : Controller
    {
        [HttpPost("Tests")]
        public async Task<Records.RecordIds> PostTest([FromBody] Submission submission, [FromServices] ITestService testSvc)
        {
            return await testSvc.SaveTestSubmission(submission);
        }

    }
}