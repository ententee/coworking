using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ententeeWarehouse.DTOs;
using ententeeWarehouse.Model;
using Microsoft.IdentityModel.Tokens;

namespace ententeeWarehouse.Services;

public class AuthService
{
    private readonly WarehouseDbContext dbContext;
    private string secretKey = "MySuperDuperSecretKeyWithEnoughLengthToBeAValidHmacSha256Key";

    public AuthService(WarehouseDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public LoginResponse Login(LoginRequest request)
    {
        User? user = dbContext.Users.FirstOrDefault(user => user.Username == request.Username);
        if (user == null)
            return LoginResponse.Failed;
        
        bool passwordMatches = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
        if (!passwordMatches)
            return LoginResponse.Failed;
        
        return new LoginResponse
        {
            Success = true,
            Token = GenerateToken(user)
        };
    }

    public bool ValidateToken(string token)
    {
        try
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secretKey);

            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            
            tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    private string GenerateToken(User user)
    {
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(secretKey);

        List<Claim> claims = new List<Claim>
        {
            new ("user_id", user.UserId.ToString()),
            new ("username", user.Username)
        };

        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(12),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        SecurityToken jwtToken = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(jwtToken);
    }
}