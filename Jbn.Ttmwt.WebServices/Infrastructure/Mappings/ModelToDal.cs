using AutoMapper;

using Jbn.Ttmwt.DAL;
using Jbn.Ttmwt.WebServices.Features.Tests;

namespace Jbn.Ttmwt.WebServices.Infrastructure.Mappings
{
    public class ModelToDal : Profile
    {
        public ModelToDal()
        {
            CreateMap<Submission, Device>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.DeviceName));

            CreateMap<Submission, Patient>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.PatientName));

            CreateMap<Submission, Proctor>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.ProctorName));

            CreateMap<Submission, Remarks>()
                .ForMember(d => d.Content, opt => opt.MapFrom(s => s.Remarks));

            CreateMap<Submission, Test>()
                // Implicit: ComfortPace1, ComfortPace2, MaxPace1, MaxPace2, Summary
                .ForMember(d => d.Device, opt => opt.MapFrom(s => s))
                .ForMember(d => d.Patient, opt => opt.MapFrom(s => s))
                .ForMember(d => d.Proctor, opt => opt.MapFrom(s => s))
                .ForMember(d => d.Remarks, opt => opt.MapFrom(s => string.IsNullOrWhiteSpace(s.Remarks) ? null : s))
                .ForMember(d => d.TestedOn, opt => opt.MapFrom(s => s.TakenOn));


        }
    }
}
