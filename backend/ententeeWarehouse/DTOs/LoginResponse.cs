namespace ententeeWarehouse.DTOs;

public class LoginResponse
{
    public static LoginResponse Failed = new LoginResponse
    {
        Success = false
    };
    
    public bool Success { get; set; }
    public string? Token { get; set; }
}