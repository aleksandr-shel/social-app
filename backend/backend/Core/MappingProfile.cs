using AutoMapper;
using backend.DTOs.Messages;
using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;

namespace backend.Core
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            string currentUsername = null;
            CreateMap<Post, PostDto>();
            CreateMap<AppUser, AuthorDto>()
                .ForMember(x => x.ImageUrl, p => p.MapFrom(x => x.Images.FirstOrDefault(i => i.IsMain).Url));
            CreateMap<AppUser, ProfileDto>()
                .ForMember(x => x.ImageUrl, p => p.MapFrom(x => x.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(x => x.Posts, p => p.MapFrom(x => x.Posts.OrderByDescending(p=> p.Date)))
                .ForMember(x => x.Following, p => p.MapFrom(x=> x.Followers.Any(x=>x.Observer.UserName == currentUsername)));

            CreateMap<Image, ProfileImage>();
            CreateMap<Message, MessageDto>();

        }
    }
}
