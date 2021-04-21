using System.Threading.Tasks;
using api.CommandsAndQueries.Account;
using api.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class AccountController  : BaseApiController
    {
      [HttpPost]
      public async Task<ActionResult<UserDto>> Login(Login.Query query)
      => await Mediator.Send(query);
    }
}