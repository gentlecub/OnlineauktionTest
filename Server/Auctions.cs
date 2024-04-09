namespace Onlineauction;
using MySql.Data.MySqlClient;

using System.Data;
using static Onlineauction.Users;

public class Auctions
{
    public record Auction(int id, string title, DateTime startTime, DateTime endTime, double highestBid, 
                          int carId, int userId, int status);

    public record AuctionPost(int id, string title, string startTime, string endTime, double highestBid,
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

            strInfo += $"{title} has id: {id}, start time: {startTime}, end time: \n" +
                       $"{endTime}, the highestBid: {highestBid}, carId: {carId}, carId: {carId} and \n" + 
                       $"status: {status}.\n";
            Console.WriteLine(strInfo);
        }
        return auctions;
    }

    public static IResult Post(AuctionPost auction, State state)
    {

        string strQuery = "INSERT INTO auctions (title, startTime, endTime, highestBid, carId, " +
                          "userId, status) values(@title, @startTime, @endTime, " +
                          "@highestBid, @carId, @userId, @status)";

        MySqlCommand command = new(strQuery, state.DB);

        command.Parameters.AddWithValue("@title", auction.title);
        command.Parameters.AddWithValue("@startTime", auction.startTime);
        command.Parameters.AddWithValue("@endTime", auction.endTime);
        command.Parameters.AddWithValue("@highestBid", auction.highestBid);
        command.Parameters.AddWithValue("@carId", auction.carId);
        command.Parameters.AddWithValue("@userId", auction.userId);
        command.Parameters.AddWithValue("@status", auction.status);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

    public static IResult UpdateBidFromAuctionId(int id, AuctionPost auction, State state)
    {

        MySqlCommand command = new("Update auctions set highestBid = @highestBid where id = @id", state.DB);

        command.Parameters.AddWithValue("@highestBid", auction.highestBid);
        command.Parameters.AddWithValue("@id", id);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

    public static IResult UpdateBidFromCarId(int carId, AuctionPost auction, State state)
    {

        MySqlCommand command = new("Update auctions set highestBid = @highestBid where carId = @carId", state.DB);

        command.Parameters.AddWithValue("@highestBid", auction.highestBid);
        command.Parameters.AddWithValue("@carId", carId);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

    public static IResult DeleteAuctionFromId(int id, State state)
    {

        MySqlCommand command = new("Delete from auctions where id = @id", state.DB);

        command.Parameters.AddWithValue("@id", id);

        command.ExecuteNonQuery();
        return TypedResults.Created();

    }

}
