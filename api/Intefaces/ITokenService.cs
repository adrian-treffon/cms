using api.Entities;

namespace api.Intefaces
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
    }
}