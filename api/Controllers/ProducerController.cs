using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Producer;
using api.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ProducerController  : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command command)
        => await Mediator.Send(command);
      
      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove(Remove.Command command)
        => await Mediator.Send(command);

      [HttpGet]
      public async Task<ActionResult<List<Producer>>> List()
        => await Mediator.Send(new List.Query());
    }
}