using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    [AllowAnonymous]
    public class BuggyController : ControllerBase
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("test")]
        public ActionResult Test()
        {
            var list = new[]
            {
                new {Name="Alex", Age=25 },
                new {Name="test", Age=23 }
            };
            var obj = new
            {
                list,
                param = new
                {
                    boom = "dsdsds"
                },
            };
            return Ok(obj);
        }
    }
}
