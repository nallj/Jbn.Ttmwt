using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Records
{
    public interface IRecordService
    {
        IEnumerable<Record> GetRecords();
        Task DeleteRecord(int recordId);
    }
}
