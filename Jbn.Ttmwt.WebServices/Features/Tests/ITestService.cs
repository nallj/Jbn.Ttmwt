using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    public interface ITestService
    {
        IEnumerable<string> GetExistingPatients();
        IEnumerable<string> GetExistingProctors();
        Task<Records.RecordIds> SaveTestSubmission(Submission submission);
    }
}
