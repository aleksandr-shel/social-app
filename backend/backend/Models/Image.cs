namespace backend.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Key { get; set; }
        public bool IsMain { get; set; }
        
    }
}
