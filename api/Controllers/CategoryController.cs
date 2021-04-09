using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Category;
using api.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Authorize]
  public class CategoryController : BaseApiController
  {
  
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command command)
        => await Mediator.Send(command);
      
      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove(Remove.Command command)
        => await Mediator.Send(command);

      [HttpGet]
      public async Task<ActionResult<List<Category>>> List()
        => await Mediator.Send(new List.Query());
    }
  
}