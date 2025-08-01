using AutoMapper;
using backend.DTOs.Profile;
using backend.Models;
using backend.Services;

namespace backend.Resolvers
{
    public class ImageProfileImageResolver : IValueResolver<Image, ProfileImage, string>
    {
        private readonly IGeneratePresignedUrl _s3Service;
        public ImageProfileImageResolver(IGeneratePresignedUrl s3BucketService)
        {
            _s3Service = s3BucketService;
        }
        public string Resolve(Image source, ProfileImage destination, string destMember, ResolutionContext context)
        {
            var key = source.Key;
            if (string.IsNullOrEmpty(key)) return null;
            return _s3Service.GeneratePreSignedURL(key);
        }
    }
}
