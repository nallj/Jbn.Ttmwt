using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Proctor
{
    [Route("api/[controller]")]
    public class ProctorsController : Controller
    {
        [HttpGet]
        public IEnumerable<string> GetExistingProctors([FromServices] IProctorService procSvc)
        {
            return procSvc.GetExistingProctors();
        }
    }
}