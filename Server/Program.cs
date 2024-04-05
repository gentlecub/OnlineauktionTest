using MySql.Data.MySqlClient;
using Onlineauction;
using System;

var builder = WebApplication.CreateBuilder(args);


MySqlConnection? db = null;
string connectionString = "server=localhost;uid=root;pwd=mypassword;database=onlineauction;port=3306";

try
{

    db = new(connectionString);
    db.Open();

    builder.Services.AddSingleton(new State(db));
    var app = builder.Build();


   
    

    app.MapGet("/", () => "Hello World!");
    app.MapGet("/users", Users.All);
    app.MapPost("/users", Users.Post);
    app.MapPost("/users/user", Users.PostUser);
    app.MapPatch("/users/password", Users.UpdateUserPassword);
    app.MapDelete("/users/fromid/{id}", Users.DeleteUserId);
    app.MapGet("/bids", Bids.All);





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