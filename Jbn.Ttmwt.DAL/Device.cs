using System;
using System.Collections.Generic;

namespace Jbn.Ttmwt.DAL
{
    public partial class Device
    {
        public Device()
        {
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Test> Test { get; set; }
    }
}