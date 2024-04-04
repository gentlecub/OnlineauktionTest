namespace Onlineauction;
using MySql.Data.MySqlClient;

using System.Data;

public class Auctions
{
    public record Auction(int id, string title, DateTime startTime, DateTime endTime, double highestBid, 
                          int carId, int userId, int status);
    public static List<Auction> All(State state)
    {
        List<Auction> auctions = new();
        string strInfo = "";
        MySqlCommand command = new("SELECT * FROM auctions", state.DB);

        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            int id = reader.GetInt32("id");
            string title = reader.GetString("title");
            DateTime startTime = reader.GetDateTime("startTime");
            DateTime endTime = reader.GetDateTime("endTime");
            double highestBid = reader.GetDouble("highestBid");
            int carId = reader.GetInt32("carId");
            int userId = reader.GetInt32("userId");
            int status = reader.GetInt32("status");
            auctions.Add(new(id, title, startTime, endTime, highestBid, carId, userId, status));

            strInfo += $"{title} has id: {id}, start time: {startTime}, end time: {endTime}, \n" +
                       $"the highestBid:{highestBid}, carId: {carId}, carId: {carId} and \n" + 
                       $"status: {status}.\n";
            Console.WriteLine(strInfo);
        }
        return auctions;
    }

}
