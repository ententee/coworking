using System.Security.Claims;
using System.Text.Encodings.Web;
using ententeeWarehouse.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace ententeeWarehouse.Middleware;

public class JwtAuthHandlerOptions: AuthenticationSchemeOptions
{
}

public class JwtAuthHandler: AuthenticationHandler<JwtAuthHandlerOptions>
{
    public JwtAuthHandler(IOptionsMonitor<JwtAuthHandlerOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) 
        : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        AuthService authService = Context.RequestServices.GetService<AuthService>()!;
        StringValues authHeader;
        if (!Context.Request.Headers.TryGetValue("Authorization", out authHeader))
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        string[] parts = authHeader.ToString().Split(" ");
        if (parts.Length != 2)
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        string token = parts[1];

        if (!authService.ValidateToken(token))
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        ClaimsPrincipal principal = new ClaimsPrincipal();
        ClaimsIdentity identity = new ClaimsIdentity(new Claim[]{}, "jwt");
        principal.AddIdentity(identity);
        return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(principal, Scheme.Name)));
    }
}