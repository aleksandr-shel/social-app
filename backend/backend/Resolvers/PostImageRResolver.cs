using AutoMapper;
using backend.DTOs.Post;
using backend.Services;

namespace backend.Resolvers
{
    public class PostImageRResolver : IValueResolver<PostImageDto, PostImageDto, string>
    {
        private readonly IGeneratePresignedUrl _s3Service;
        public PostImageRResolver(IGeneratePresignedUrl s3Service)
        {
            _s3Service = s3Service;
        }

        public string Resolve(PostImageDto source, PostImageDto destination, string destMember, ResolutionContext context)
        {
            var key = source.Key;
            if (string.IsNullOrEmpty(key)) return null;
            return _s3Service.GeneratePreSignedURL(key);
        }
    }
}
