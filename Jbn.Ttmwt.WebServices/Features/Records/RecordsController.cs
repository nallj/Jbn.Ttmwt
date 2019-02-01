using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Records
{
    [Route("api/Records")]
    public class RecordsController : Controller
    {
        [HttpDelete("{recordId}")]
        public async Task DeleteRecord(int recordId, [FromServices] IRecordService recordSvc)
        {
            await recordSvc.DeleteRecord(recordId);
        }

        [HttpGet]
        public IEnumerable<Record> GetRecords([FromServices] IRecordService recordSvc)
        {
            return recordSvc.GetRecords();
        }
    }
}