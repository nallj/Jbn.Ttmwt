using System.Collections.Generic;
using System.Linq;

using Jbn.Ttmwt.DAL;

namespace Jbn.Ttmwt.WebServices.Features.Proctor
{
    public class ProctorService : IProctorService
    {
        private readonly AppDbContext dbContext;

        public ProctorService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<string> GetExistingProctors()
        {
            var proctors = dbContext.Proctor
                .Select(x => x.Name)
                .OrderBy(x => x);
            return proctors;
        }
    }
}
