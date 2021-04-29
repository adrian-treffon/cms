using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.ProductType;
using api.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    public class ProductTypeController : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command command)
        => await Mediator.Send(command);
      
      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove([FromQuery]int id)
        => await Mediator.Send(new Remove.Command() {Id = id});

      [HttpGet]
      public async Task<ActionResult<List<ProductType>>> List()
        => await Mediator.Send(new List.Query());

      [HttpPut]
      public async Task<ActionResult<Unit>> Activate([FromBody]int id)
        => await Mediator.Send(new Activate.Command() {Id = id});

      [HttpPut("edit")]
      public async Task<ActionResult<Unit>> Edit([FromBody]Edit.Command command)
        => await Mediator.Send(command);
    }
}