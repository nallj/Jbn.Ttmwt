using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Patient
{
    [Route("api/[controller]")]
    public class PatientsController : Controller
    {
        [HttpGet]
        public IEnumerable<string> GetExistingPatients([FromServices] IPatientService patientSvc)
        {
            return patientSvc.GetExistingPatients();
        }
    }
}