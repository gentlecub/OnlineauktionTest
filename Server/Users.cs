namespace Onlineauction;
using MySql.Data.MySqlClient;

using System.Data;

public class Users
{
    public record User(int Id, string Username, string Password, string Email, string Name, string Roll);
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

}
