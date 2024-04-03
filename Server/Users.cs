namespace Onlineauction;
using MySql.Data.MySqlClient;

using System.Data;

public class Users
{
    public record User(int id, string username, string password, string email, string name, string roll);
    public static List<User> All(State state)
    {
        List<User> users = new();
        string strInfo = "";
        MySqlCommand command = new("SELECT * FROM users", state.DB);

        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            int id = reader.GetInt32("id");
            string username = reader.GetString("username");
            string password = reader.GetString("password");
            string email = reader.GetString("email");
            string name = reader.GetString("name");
            string roll = reader.GetString("roll");
            users.Add(new(id, username, password, email, name, roll));



           strInfo += $"{username} has id: {id}, password: {password}, email:{email},\n" + 
                      $" name:{name}, roll: {roll}\n";
           Console.WriteLine(strInfo);
        }
        return users;
    }
    public static IResult Post(User user, State state)
    {

        string strQuery = "INSERT INTO users (username, password, email, name, roll) " +
                          "values(@username, @password, @email, @name, @roll)";

        MySqlCommand command = new(strQuery, state.DB);

        command.Parameters.AddWithValue("@username", user.username);
        command.Parameters.AddWithValue("@email", user.email);
        command.Parameters.AddWithValue("@password", user.password);
        command.Parameters.AddWithValue("@name", user.name);      
        command.Parameters.AddWithValue("@roll", user.roll);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

    public static IResult PostUser(User user, State state)
    {

        string strQuery = "INSERT INTO users (username, password, email, name, roll) " +
                          "values(@username, @password, @email, @name, 'user')";

        MySqlCommand command = new(strQuery, state.DB);

        command.Parameters.AddWithValue("@username", user.username);
        command.Parameters.AddWithValue("@email", user.email);
        command.Parameters.AddWithValue("@password", user.password);
        command.Parameters.AddWithValue("@name", user.name);
        
        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

}
