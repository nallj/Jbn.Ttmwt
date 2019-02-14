using AutoMapper;
using System.Linq;
using System.Threading.Tasks;

using Jbn.Ttmwt.DAL;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    public class TestService : ITestService
    {
        private readonly AppDbContext dbContext;

        public TestService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Records.RecordIds> SaveTestSubmission(Submission submission)
        {
            var dbTest = Mapper.Map<Test>(submission);

            var matchingDevice = dbContext.Device
                .FirstOrDefault(x => x.Name == submission.DeviceName);
            if (matchingDevice != null)
            {
                dbTest.Device = null;
                dbTest.DeviceId = matchingDevice.Id;
            }

            var matchingPatient = dbContext.Patient
                .FirstOrDefault(x => x.Name == submission.PatientName);
            if (matchingPatient != null)
            {
                dbTest.Patient = null;
                dbTest.PatientId = matchingPatient.Id;
            }

            var matchingProctor = dbContext.Proctor
                .FirstOrDefault(x => x.Name == submission.ProctorName);
            if (matchingProctor != null)
            {
                dbTest.Proctor = null;
                dbTest.ProctorId = matchingProctor.Id;
            }

            dbContext.Test.Add(dbTest);
            await dbContext.SaveChangesAsync();

            var recordIds = Mapper.Map<Records.RecordIds>(dbTest);
            return recordIds;
        }
    }
}
