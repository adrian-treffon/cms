using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.Account
{
    public class Login
    {
      public class Query : IRequest<UserDto>
      {
        public string Login { get; set; }
        public string Password { get; set; }
      }

      public class CommandValidator : AbstractValidator<Query>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Login).NotEmpty();
          RuleFor(x => x.Password).NotEmpty();
        }
      }

      public class Handler : IRequestHandler<Query, UserDto>
      {
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        public Handler(ITokenService tokenService, IUserRepository userRepository)
        {
          _userRepository = userRepository;
          _tokenService = tokenService;
        }

        public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
        {
          AppUser user = await _userRepository.GetUserByLoginAsync(request.Login);
          if (user == null) throw new Exception("Invalid login");

          using HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
          byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));

          for (int i = 0; i < computedHash.Length; i++)
          {
            if (computedHash[i] != user.PasswordHash[i]) throw new Exception("Invalid password");
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
}