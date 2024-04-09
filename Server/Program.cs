using MySql.Data.MySqlClient;
using Onlineauction;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("opa23.onlineauction.cars");
builder.Services.AddAuthorizationBuilder().AddPolicy("admin_route", policy => policy.RequireRole("admin"));
builder.Services.AddAuthorizationBuilder().AddPolicy("user_route", policy => policy.RequireRole("user"));

string connectionString = "server=localhost;uid=root;pwd=mypassword;database=onlineauction;port=3306";

try
{

    builder.Services.AddSingleton(new State(connectionString));
    var app = builder.Build();

    app.MapPost("/login", Auth.Login);
    app.MapGet("/admin", () => "Hello, Admin!").RequireAuthorization("admin_route");
    app.MapGet("/user", () => "Hello, User!").RequireAuthorization("user_route");

    app.MapGet("/users", Users.All);
    app.MapPost("/users", Users.Post);
    app.MapPost("/users/user", Users.PostUser);

    app.MapGet("/auctions", Auctions.All);
    app.MapGet("/auctions/{id}", Auctions.GetAuctionFromId);
    app.MapPost("/auctions", Auctions.Post);
    app.MapPatch("/auctions/fromid/{id}", Auctions.UpdateBidFromAuctionId);
    app.MapPatch("/auctions/fromcarid/{carId}", Auctions.UpdateBidFromCarId);
    app.MapDelete("/auctions/fromid/{id}", Auctions.DeleteAuctionFromId);

    //obtaining car data
    app.MapGet("/", Cars.GetCarsHome);
    app.MapGet("/cars", Cars.GetAllCars);
    app.MapGet("/cars/{id}", Cars.GetCarId);

    app.Run("http://localhost:3008");

}
catch (MySqlException e)
{
    Console.WriteLine(e);

}

public record State(string DB);