namespace Onlineauction;

using System.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using MySql.Data.MySqlClient;

public class Auth
{

    public record LoginData(string Username, string Password);

    public static async Task<IResult> Login(LoginData user, State state, HttpContext ctx)
    {

        MySqlCommand cmd = new("select id, roll from users where username = @Username and password = @Password", state.DB);

        cmd.Parameters.AddWithValue("@Username", user.Username);

        cmd.Parameters.AddWithValue("@Password", user.Password);

        using var reader = cmd.ExecuteReader();

        // Check if any are found, if none it returns false, if 1 or more, it gives access to them

        bool bIsFound = reader.Read();

        if (!bIsFound)

        {

            return TypedResults.Problem("No Such User Exists");

        }

        string id = reader.GetInt32("id").ToString();

        string roll = reader.GetString("roll");

        Console.WriteLine(id + ", " + roll);

        await ctx.SignInAsync("opa23.onlineauction.cars", new ClaimsPrincipal(
            new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, id),
                    new Claim(ClaimTypes.Role, roll),
                },
                "opa23.onlineauction.cars"
            )
        ));
        return TypedResults.Ok("Signed in");
    }
}
