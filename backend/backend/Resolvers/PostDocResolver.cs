using AutoMapper;
using backend.DTOs.Post;
using backend.Models;
using backend.Services;

namespace backend.Resolvers
{
    public class PostDocResolver : IValueResolver<PostDocument, PostDocumentDto, string>
    {
        private readonly IGeneratePresignedUrl _s3Service;
        public PostDocResolver(IGeneratePresignedUrl s3Service)
        {
            _s3Service = s3Service;
        }
        public string Resolve(PostDocument source, PostDocumentDto destination, string destMember, ResolutionContext context)
        {
            var key = source.Key;
            if (string.IsNullOrEmpty(key)) return null;
            return _s3Service.GeneratePreSignedURL(key);
        }
    }
}
