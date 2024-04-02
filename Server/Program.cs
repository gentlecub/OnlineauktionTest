using MySql.Data.MySqlClient;

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



    app.Run();


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