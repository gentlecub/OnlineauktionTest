using MySql.Data.MySqlClient;
using Onlineauction;

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