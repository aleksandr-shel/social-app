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
                .ForMember(x => x.Posts, p => p.MapFrom(x => x.Posts.OrderByDescending(p => p.Date)))
                .ForMember(x => x.Following, p => p.MapFrom(x => x.Followers.Any(x => x.Observer.UserName == currentUsername)))
                .ForMember(x => x.Followers, p => p.MapFrom(x => x.Followers.Count()))
                .ForMember(x => x.Followings, p => p.MapFrom(x => x.Followings.Count()));

            CreateMap<Image, ProfileImage>();
            CreateMap<Message, MessageDto>()
                .ForMember(x => x.RoomId, p => p.MapFrom(x => x.Room.Id));

            CreateMap<PostImage, PostImageDto>();


        }
    }
}
