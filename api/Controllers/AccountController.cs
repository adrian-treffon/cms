using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Intefaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class AccountController  : BaseApiController
    {
      private readonly ITokenService _tokenService;
      private readonly IUserRepository _userRepository;
     
      public AccountController(ITokenService tokenService, IUserRepository userRepository)
      {
        _userRepository = userRepository;
        _tokenService = tokenService;
      }

      [HttpPost]
      public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
      {
        AppUser user = await _userRepository.GetUserByLoginAsync(loginDto.Login);
        if (user == null) return Unauthorized("Invalid login");

        using HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
        byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
          Login = user.Login,
          Token = _tokenService.CreateToken(user),
          Id = user.Id
        };
      }
    }
}