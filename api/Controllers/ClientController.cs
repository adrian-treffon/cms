using System.Collections.Generic;
using System.Threading.Tasks;
using api.CommandsAndQueries.Client;
using api.DTOs;
using api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace api.Controllers
{ 
   [Authorize]
    public class ClientController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Customer>>> List()
        => await Mediator.Send(new List.Query());
    }
}