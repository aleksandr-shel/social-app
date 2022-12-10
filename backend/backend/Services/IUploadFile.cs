namespace backend.Services
{
    public interface IUploadFile
    {
        public Task<(string,string)> UploadFile(IFormFile file);
        public Task<bool> DeleteFile(string key);
    }
}
