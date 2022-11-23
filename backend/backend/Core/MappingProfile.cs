using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Core
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<AppUser, AuthorDto>();

        }
    }
}
