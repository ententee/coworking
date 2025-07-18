using ententeeWarehouse.DTOs;
using ententeeWarehouse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ententeeWarehouse.Controllers;

[ApiController]
[Route("auth")]
public class AuthController: ControllerBase
{
    private readonly AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public ActionResult<LoginResponse> Login([FromBody]LoginRequest loginData)
    {
        var response = authService.Login(loginData);
        if (!response.Success)
            return Unauthorized();
        
        return Ok(response);
    }
}