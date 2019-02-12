using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Proctor
{
    public interface IProctorService
    {
        IEnumerable<string> GetExistingProctors();
    }
}
