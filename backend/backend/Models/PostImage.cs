
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class PostImage
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Key { get; set; }
    }
}
