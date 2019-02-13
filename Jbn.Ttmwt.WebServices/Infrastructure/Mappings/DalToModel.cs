using AutoMapper;

using Jbn.Ttmwt.DAL;
using Jbn.Ttmwt.WebServices.Features.Records;

namespace Jbn.Ttmwt.WebServices.Infrastructure.Mappings
{
    public class DalToModel : Profile
    {
        public DalToModel()
        {
            CreateMap<Test, Record>();
                // Implicit: CreatedOn, Id, Summary
        }
    }
}
