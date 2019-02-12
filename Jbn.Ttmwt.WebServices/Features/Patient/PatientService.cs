using System.Collections.Generic;
using System.Linq;

using Jbn.Ttmwt.DAL;

namespace Jbn.Ttmwt.WebServices.Features.Patient
{
    public class PatientService : IPatientService
    {
        private readonly AppDbContext dbContext;

        public PatientService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<string> GetExistingPatients()
        {
            var patients = dbContext.Patient
                .Select(x => x.Name)
                .OrderBy(x => x);
            return patients;
        }
    }
}
