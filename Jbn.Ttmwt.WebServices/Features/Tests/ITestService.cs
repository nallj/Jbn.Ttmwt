using System.Threading.Tasks;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    public interface ITestService
    {
        Task<Records.RecordIds> SaveTestSubmission(Submission submission);
    }
}
