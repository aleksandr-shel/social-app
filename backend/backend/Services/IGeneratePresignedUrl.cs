namespace backend.Services
{
    public interface IGeneratePresignedUrl
    {
        public string GeneratePreSignedURL(string objectKey, int expireSeconds = 3600);
    }
}
