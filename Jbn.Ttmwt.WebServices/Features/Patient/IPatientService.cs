using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Patient
{
    public interface IPatientService
    {
        IEnumerable<string> GetExistingPatients();
    }
}
