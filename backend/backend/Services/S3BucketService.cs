using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using System.Text.RegularExpressions;

namespace backend.Services
{
    public class S3BucketService : IUploadFile, IGeneratePresignedUrl
    {
        private readonly IAmazonS3 _client;
        private readonly ILogger<S3BucketService> _logger;
        private readonly string _bucketName = "shared-bucket-aleksandr";
        private readonly string _region = "ca-central-1";
        public S3BucketService(IAmazonS3 client, ILogger<S3BucketService> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task<bool> DeleteFile(string key)
        {
            try
            {

                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = key
                };

                var response = await _client.DeleteObjectAsync(deleteObjectRequest);
                if (response.HttpStatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    return true;
                }

            }
            catch (AmazonS3Exception e)
            {
                _logger.LogError(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
            }
            return false;
        }

        public async Task<(string,string)> UploadFile(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    await using var stream = file.OpenReadStream();
                    var key = "social-app-coopchik-" + Guid.NewGuid().ToString() + "_" + file.FileName;

                    key = Regex.Replace(key, @"[^\u0000-\u007F]+", string.Empty);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = stream,
                        Key = key,
                        BucketName = _bucketName,
                        ContentType = file.ContentType
                        //CannedACL = S3CannedACL.PublicRead
                    };

                    uploadRequest.UploadProgressEvent +=
                        new EventHandler<UploadProgressArgs>
                            (uploadRequest_UploadPartProgressEvent);

                    var fileTransferUtility = new TransferUtility(_client);
                    await fileTransferUtility.UploadAsync(uploadRequest);
                    
                    return ($"https://{_bucketName}.s3.{_region}.amazonaws.com/{key}", key);
                }
            }
            catch (AmazonS3Exception e)
            {
                _logger.LogError(e.Message, e);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
            }
            return (null, null);
        }

        public string GeneratePreSignedURL(string objectKey, int expireSeconds = 3600)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = objectKey,
                Expires = DateTime.UtcNow.AddSeconds(expireSeconds)
            };

            string url = _client.GetPreSignedURL(request);
            return url;
        }

        void uploadRequest_UploadPartProgressEvent(object sender, UploadProgressArgs e)
        {
            // Process event.
            _logger.LogInformation($"{e.TransferredBytes}/ {e.TotalBytes}");
        }
    }
}
