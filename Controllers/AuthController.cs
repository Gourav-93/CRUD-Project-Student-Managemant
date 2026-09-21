using Microsoft.AspNetCore.Mvc;
using StudentManagementApi.Data;
using StudentManagementApi.Models;

namespace StudentManagementApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER
        [HttpPost("reg")]
        public IActionResult Register(User user)
        {

            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("Email Already Registered");
            }


            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registration Successfully");
        }



        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existingUser = _context.Users
                .FirstOrDefault(x =>
                    x.Email == user.Email &&
                    x.Password == user.Password);

            if (existingUser == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

            return Ok(new
            {
                message = "Login Successfully",
                name = existingUser.Name,
                email = existingUser.Email
            });
        }
    }
}
