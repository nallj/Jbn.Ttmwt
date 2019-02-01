using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    [Route("api")]
    public class TestsController : Controller
    {

        [HttpGet("Patients")]
        public IEnumerable<string> GetPatients([FromServices] ITestService testSvc)
        {
            return testSvc.GetExistingPatients();
        }

        [HttpGet("Proctors")]
        public IEnumerable<string> GetProctors([FromServices] ITestService testSvc)
        {
            return testSvc.GetExistingProctors();
        }

        [HttpPost("Tests")]
        public async Task<Records.RecordIds> PostTest([FromBody] Submission submission, [FromServices] ITestService testSvc)
        {
            return await testSvc.SaveTestSubmission(submission);
        }

    }
}