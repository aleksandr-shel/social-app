using AutoMapper;
using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;
using backend.Services;

namespace backend.Resolvers
{
    public class AppUserImageResolver : IValueResolver<AppUser, ProfileDto, string>
    {
        private readonly IGeneratePresignedUrl _s3Service;
        public AppUserImageResolver(IGeneratePresignedUrl s3BucketService)
        {
            _s3Service = s3BucketService;
        }
        public string Resolve(AppUser source, ProfileDto destination, string destMember, ResolutionContext context)
        {
            var key = source.Images.FirstOrDefault(x => x.IsMain)?.Key;

            if (string.IsNullOrEmpty(key)) return null;
            return _s3Service.GeneratePreSignedURL(key);
        }
    }
}
