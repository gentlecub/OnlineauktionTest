namespace Onlineauction;
using MySql.Data.MySqlClient;
using System.Data;
using static Onlineauction.Auctions;
using static Onlineauction.Users;

public class Users
{
    public record User(int id, string username, string password, string email, string name, string roll);
    public static List<User> All(State state)
    {
        List<User> users = new();
        string strInfo = "";
        string strQuery = "SELECT * FROM users";
        var reader = MySqlHelper.ExecuteReader(state.DB, strQuery);

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

        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@username", user.username),
           new("@email", user.email),
           new("@password", user.password),
           new("@name", user.name),
           new("@roll", user.roll)
        ]);

        return TypedResults.Created();

    }

    // Creating post to not allow a user choose a roll.
    public static IResult PostUser(User user, State state)
    {

        string strQuery = "INSERT INTO users (username, password, email, name, roll) " +
                          "values(@username, @password, @email, @name, 'user')";

        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@username", user.username),
           new("@email", user.email),
           new("@password", user.password),
           new("@name", user.name)
        ]);

        return TypedResults.Created();

    }
    public static IResult UpdateUserPassword(User user , State state)
    {

        MySqlCommand command = new("Update users password = @password where userPassword = @userPassword", state.DB);

        command.Parameters.AddWithValue("@password", user.password);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

    public static IResult DeleteUserId(int id, State state)
    {
        
        MySqlCommand command = new("Delete from users Where id = @id", state.DB);
        Console.WriteLine("Please enter id of user to be deleted");
        string Id = Console.ReadLine() ?? string.Empty;

        command.Parameters.AddWithValue("@id", id);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

}
