using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Product;
using api.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ProductController : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command commnad)
      => await Mediator.Send(commnad);

      [HttpGet]
      public async Task<ActionResult<List<Product>>> List()
        => await Mediator.Send(new List.Query());

      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove(Remove.Command command)
        => await Mediator.Send(command);
    }
}