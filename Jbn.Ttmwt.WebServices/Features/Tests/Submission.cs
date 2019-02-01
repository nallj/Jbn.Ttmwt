using System;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    public enum AssistanceLevelEnum
    {
        None = 0,
        Minimal = 1,
        Moderate = 2,
        Extensive = 4
    }

    public class Submission
    {
        public string ProctorName { get; set; }
        public string PatientName { get; set; }
        public DateTimeOffset TakenOn { get; set; }
        public string DeviceName { get; set; }
        public decimal ComfortPace1 { get; set; }
        public decimal ComfortPace2 { get; set; }
        public decimal MaxPace1 { get; set; }
        public decimal MaxPace2 { get; set; }
        public AssistanceLevelEnum AssistanceLevel { get; set; }
    }
}
