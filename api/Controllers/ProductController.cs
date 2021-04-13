using System.Threading.Tasks;
using api.CommandsAndQueries.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static api.CommandsAndQueries.Product.List;

namespace api.Controllers
{
    public class ProductController : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<Unit>> Create(Create.Command commnad)
      => await Mediator.Send(commnad);

      [HttpGet]
      public async Task<ActionResult<ProductsEnvelope>> List(
      [FromQuery]int? limit, 
      [FromQuery]int? offset, 
      [FromQuery]bool isDescending,
      [FromQuery]string orderBy,
      [FromQuery]string filterBy, 
      [FromQuery]string searchedPhrase)
        => await Mediator.Send(new List.Query(limit, offset, orderBy, isDescending, filterBy, searchedPhrase));

      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove(Remove.Command command)
        => await Mediator.Send(command);
    }
}