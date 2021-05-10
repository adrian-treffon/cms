using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Order;
using api.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{  
    [Authorize]
    public class OrderController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> List([FromQuery] int status)
        => await Mediator.Send(new List.Query() {Status = status});

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> Get(int id)
          => await Mediator.Send(new Get.Query(){Id = id});

        [HttpPut]
        public async Task<Unit> Edit([FromQuery]int id, [FromQuery]int status)
          => await Mediator.Send(new Edit.Command(){Id = id, Status = status});
    }

}