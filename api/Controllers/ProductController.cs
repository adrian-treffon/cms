using System.Threading.Tasks;
using api.CommandsAndQueries.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ProductController : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command commnad)
      => await Mediator.Send(commnad);
    }
}