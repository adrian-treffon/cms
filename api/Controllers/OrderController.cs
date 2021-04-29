using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Order;
using api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{  
    [Authorize]
    public class OrderController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> List()
        => await Mediator.Send(new List.Query());
    }
}