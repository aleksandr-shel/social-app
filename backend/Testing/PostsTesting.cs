using Amazon;
using Amazon.Runtime.Internal.Util;
using Amazon.S3;
using AutoMapper;
using backend.Controllers;
using backend.Core;
using backend.Data;
using backend.DTOs;
using backend.DTOs.Post;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Testing
{
    public class PostsTesting
    {
        private HttpClient _httpClient;
        public PostsTesting()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:5001");

        }
        [Fact]
        public async void GetPostsUnauthorized()
        {
            var response = await _httpClient.GetAsync("api/posts");
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
        [Fact]
        public async void GetPostsAuthorized()
        {
            var loginDto = new LoginDto
            {
                Email = "alex@test.com",
                Password = "Pa$$w0rd"
            };
            string json = JsonConvert.SerializeObject(loginDto);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/account/login",content);
            var user = await response.Content.ReadFromJsonAsync<UserDto>();
            Assert.NotNull(user);
            if (user != null)
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", user.Token);
            }
            var postResponse = await _httpClient.GetAsync("api/posts");
            Assert.Equal(HttpStatusCode.OK, postResponse.StatusCode);
        }

        [Fact]
        public async void CreateNewPostUnauthorized()
        {
            var postCreateDto = new PostCreateDto
            {
                Content = "unit test create post"
            };

            var httpcontent = new StringContent(JsonConvert.SerializeObject(postCreateDto), System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/posts",httpcontent);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async void CreateNewPostAuthorized()
        {
            var loginDto = new LoginDto
            {
                Email = "alex@test.com",
                Password = "Pa$$w0rd"
            };
            string json = JsonConvert.SerializeObject(loginDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/account/login", content);
            var user = await response.Content.ReadFromJsonAsync<UserDto>();
            Assert.NotNull(user);
            if (user != null)
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", user.Token);
            }
            var postContent = new MultipartFormDataContent();
            postContent.Add(new StringContent("content of test post "), "Content");
            var postResponse = await _httpClient.PostAsync("api/posts", postContent);
            Assert.Equal(HttpStatusCode.OK, postResponse.StatusCode);
        }
    }
}
