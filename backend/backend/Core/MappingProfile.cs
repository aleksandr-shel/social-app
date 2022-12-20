using AutoMapper;
using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;

namespace backend.Core
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<AppUser, AuthorDto>()
                .ForMember(x => x.ImageUrl, p => p.MapFrom(x => x.Images.FirstOrDefault(i => i.IsMain).Url));
            CreateMap<AppUser, ProfileDto>()
                .ForMember(x => x.ImageUrl, p => p.MapFrom(x => x.Images.FirstOrDefault(i => i.IsMain).Url));

            CreateMap<Image, ProfileImage>();


        }
    }
}
