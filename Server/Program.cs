using Microsoft.Extensions.FileProviders;
using MySql.Data.MySqlClient;
using Onlineauction;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("opa23.onlineauction.cars");
builder.Services.AddAuthorizationBuilder().AddPolicy("admin_route", policy => policy.RequireRole("admin"));
builder.Services.AddAuthorizationBuilder().AddPolicy("user_route", policy => policy.RequireRole("user"));

string connectionString = "server=localhost;uid=root;pwd=admin;database=onlineauction;port=3306";

try
{

    builder.Services.AddSingleton(new State(connectionString));

    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.ListenAnyIP(3008);
    });
    var app = builder.Build();


    var distPath = Path.Combine(app.Environment.ContentRootPath, "./dist");
    var fileProvider = new PhysicalFileProvider(distPath);

    app.UseHttpsRedirection();

    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = fileProvider,
        DefaultFileNames = new List<string> { "index.html" }
    });

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = fileProvider,
        RequestPath = ""
    });

    app.UseRouting();


    app.MapPost("/api/login", Auth.Login);
    app.MapGet("/api/admin", () => "Hello, Admin!").RequireAuthorization("admin_route");
    app.MapGet("/api/user", () => "Hello, User!").RequireAuthorization("user_route");

    //users
    app.MapGet("/api/users", Users.All);
    app.MapPost("/api/users", Users.Post);
    app.MapPost("/api/users/user", Users.PostUser);
    app.MapPatch("/api/users/password/{id}", Users.UpdateUserPassword);
    app.MapDelete("/api/users/fromid/{id}", Users.DeleteUserId);

    //auctions
    app.MapGet("/api/auctions", Auctions.All);
    app.MapGet("/api/auctions/{id}", Auctions.GetAuctionFromId);
    app.MapPost("/api/auctions", Auctions.Post);
    app.MapPatch("/api/auctions/fromid/{id}", Auctions.UpdateBidFromAuctionId);
    app.MapPatch("/api/auctions/fromcarid/{carId}", Auctions.UpdateBidFromCarId);
    app.MapDelete("/api/auctions/fromid/{id}", Auctions.DeleteAuctionFromId);
    app.MapPut("/api/auctions/{id}", Auctions.PutAuctions);

    //obtaining cars data
    /*
    app.MapGet("/", Cars.GetCarsHome);
    app.MapGet("/cars", Cars.GetAllCars);
    app.MapGet("/cars/{id}", Cars.GetCarId);
    app.MapPost("/cars", Cars.PostCar);
    app.MapPost("/cars/getid", Cars.PostCarGetId);
    app.MapPut("/cars/edit/{id}", Cars.EditCar);
    app.MapDelete("/cars/delete/{id}", Cars.DeleteCar);
       */
    app.MapGet("/api/cars/home", Cars.GetCarsHome);
    app.MapGet("/api/cars", Cars.GetAllCars);
    app.MapGet("/api/cars/{id}", Cars.GetCarId);
    app.MapPost("/api/cars", Cars.PostCar);
    app.MapPost("/api/cars/getid", Cars.PostCarGetId);
    app.MapPut("/api/cars/edit/{id}", Cars.EditCar);
    app.MapDelete("/api/cars/delete/{id}", Cars.DeleteCar);

    //bids
    app.MapGet("/api/bids", Bids.All);
    app.MapPost("/api/bids", Bids.PostBid);


    app.MapFallback(async context =>
    {
        string path = context.Request.Path.Value;
        if (!path.StartsWith("/api/"))
        {
            context.Response.ContentType = "text/html";
            await context.Response.SendFileAsync(Path.Combine(distPath, "index.html"));
        }
    });

    // Remove "http://localhost:3008" when deploying to server. Instead use app.Run();.


    app.Run("http://localhost:3008");
    // app.Run();


}


catch (MySqlException e)
{
    Console.WriteLine(e);
}

public record State(string DB);