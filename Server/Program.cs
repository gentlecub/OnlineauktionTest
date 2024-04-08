using MySql.Data.MySqlClient;
using Onlineauction;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("opa23.onlineauction.cars");
builder.Services.AddAuthorizationBuilder().AddPolicy("admin_route", policy => policy.RequireRole("admin"));
builder.Services.AddAuthorizationBuilder().AddPolicy("user_route", policy => policy.RequireRole("user"));

MySqlConnection? db = null;
string connectionString = "server=localhost;uid=root;pwd=mypassword;database=onlineauction;port=3306";

try
{

    db = new(connectionString);
    db.Open();

    builder.Services.AddSingleton(new State(db));
    var app = builder.Build();

    app.MapPost("/login", Auth.Login);
    app.MapGet("/admin", () => "Hello, Admin!").RequireAuthorization("admin_route");
    app.MapGet("/user", () => "Hello, User!").RequireAuthorization("user_route");

    app.MapGet("/", () => "Hello World!");

    app.MapGet("/", () => "Hello World!");
    app.MapGet("/users", Users.All);
    app.MapPost("/users", Users.Post);
    app.MapGet("/auctions", Auctions.All);
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
finally
{
    db.Close();
}


public record State(MySqlConnection DB);