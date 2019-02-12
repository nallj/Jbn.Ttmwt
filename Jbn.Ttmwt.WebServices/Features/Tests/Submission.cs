using Newtonsoft.Json;
using System;

namespace Jbn.Ttmwt.WebServices.Features.Tests
{
    //public enum AssistanceLevelEnum
    //{
    //    None = 0,
    //    Minimal = 1,
    //    Moderate = 2,
    //    Extensive = 4
    //}

    public class Submission
    {
        [JsonProperty("proctor")]
        public string ProctorName { get; set; }

        [JsonProperty("patient")]
        public string PatientName { get; set; }

        [JsonProperty("dateOfTest")]
        public DateTimeOffset TakenOn { get; set; }

        [JsonProperty("device")]
        public string DeviceName { get; set; }

        [JsonProperty("comfPace1")]
        public decimal ComfortPace1 { get; set; }

        [JsonProperty("comfPace2")]
        public decimal ComfortPace2 { get; set; }

        [JsonProperty("maxPace1")]
        public decimal MaxPace1 { get; set; }

        [JsonProperty("maxPace2")]
        public decimal MaxPace2 { get; set; }

        //public AssistanceLevelEnum AssistanceLevel { get; set; }

        public string Remarks { get; set; }
        public string Summary { get; set; }
    }
}
