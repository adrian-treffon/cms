using System.Threading.Tasks;
using api.CommandsAndQueries.Product;
using api.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static api.CommandsAndQueries.Product.List;

namespace api.Controllers
{
    [Authorize]
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

      [HttpGet("{id}")]
      public async Task<ActionResult<Product>> Get(int id)
        => await Mediator.Send(new Get.Query(){Id = id});

      [HttpDelete]
      public async Task<ActionResult<Unit>> Remove(Remove.Command command)
        => await Mediator.Send(command);

      [HttpPut]
      public async Task<ActionResult<Unit>> Edit(Edit.Command command)
      { 
          return await Mediator.Send(command);
      }
    }
}