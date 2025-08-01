using AutoMapper;
using AutoMapper.Execution;
using backend.DTOs.Post;
using backend.Models;
using backend.Services;

namespace backend.Resolvers
{
    public class PostImageResolver : IValueResolver<PostImage, PostImageDto, string>
    {
        private readonly IGeneratePresignedUrl _s3Service;
        public PostImageResolver(IGeneratePresignedUrl s3Service)
        {
            _s3Service = s3Service;
        }

        public string Resolve(PostImage source, PostImageDto destination, string destMember, ResolutionContext context)
        {
            var key = source.Key;
            if (string.IsNullOrEmpty(key)) return null;
            return _s3Service.GeneratePreSignedURL(key);
        }
    }
}
