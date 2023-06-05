using backend.Core;
using backend.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected async Task<ActionResult> HandlePagedList<T>(IQueryable<T> query, PagingParams param)
        {
            var list = await PagedList<T>.CreateAsync(query, param.PageNumber, param.PageSize);

            Response.AddPaginationHeader(list.CurrentPage, list.PageSize, list.TotalCount, list.TotalPages);

            return Ok(list);
        }
    }
}
