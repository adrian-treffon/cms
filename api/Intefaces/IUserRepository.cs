using System.Threading.Tasks;
using api.Entities;

namespace api.Intefaces
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByLoginAsync(string login);
    }
}