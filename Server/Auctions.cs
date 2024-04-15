namespace Onlineauction;
using MySql.Data.MySqlClient;
using System.Collections.Specialized;
using System.Data;
using static Onlineauction.Auctions;
using static Onlineauction.Cars;
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
        var reader =  MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM auctions");

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

    // Get auction by id. 
    public static Auction GetAuctionFromId(int id, State state)
    {
        string query = "SELECT * FROM auctions Where id = @id";
        var reader = MySqlHelper.ExecuteReader(state.DB, query, [ new("@id", id) ]);
        string strInfo = "";

        if (reader.Read())
        {
            int auctId = reader.GetInt32("id");
            string title = reader.GetString("title");
            DateTime startTime = reader.GetDateTime("startTime");
            DateTime endTime = reader.GetDateTime("endTime");
            double highestBid = reader.GetDouble("highestBid");
            int carId = reader.GetInt32("carId");
            int userId = reader.GetInt32("userId");
            int status = reader.GetInt32("status");
            Auction auction = new(auctId, title, startTime, endTime, highestBid, carId, userId, status);

            strInfo += $"{title} has id: {auctId}, start time: {startTime}, end time: \n" +
                        $"{endTime}, the highestBid: {highestBid}, carId: {carId}, carId: {carId} and \n" +
                        $"status: {status}.\n";
            Console.WriteLine(strInfo);
            return auction;
        }
        else
        {
            return null;
        }

    }

    public static IResult Post(AuctionPost auction, State state)
    {

        string strQuery = "INSERT INTO auctions (title, startTime, endTime, highestBid, carId, " +
                          "userId, status) values(@title, @startTime, @endTime, " +
                          "@highestBid, @carId, @userId, @status)";

        MySqlHelper.ExecuteNonQuery(state.DB,strQuery, 
        [
           new("@title", auction.title),
           new("@startTime", auction.startTime),
           new("@endTime", auction.endTime),
           new("@highestBid", auction.highestBid),
           new("@carId", auction.carId),
           new("@userId", auction.userId),
           new("@status", auction.status)
        ]);

        return TypedResults.Created();

    }

    public static IResult UpdateBidFromAuctionId(int id, AuctionPost auction, State state)
    {
        string strQuery = "Update auctions set highestBid = @highestBid where id = @id";

        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@id", id),
           new("@highestBid", auction.highestBid)
        ]);
 
        return TypedResults.Created();

    }

    public static IResult UpdateBidFromCarId(int carId, AuctionPost auction, State state)
    {

        string strQuery = "Update auctions set highestBid = @highestBid where carId = @carId";

        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@carId", carId),
           new("@highestBid", auction.highestBid)
        ]);

        return TypedResults.Created();

    }

    public static IResult DeleteAuctionFromId(int id, State state)
    {

        string strQuery = "Delete from auctions where id = @id";
        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@id", id)
        ]);
  
        return TypedResults.Ok("Auction with id {id} deleted!");

    }
    public static IResult PutAuctions(int id, AuctionPost auction, State state)
    {

        string strQuery = "UPDATE auctions SET title = @title, startTime = @startTime, endTime = @endTime, " +
                       "highestBid = @highestBid, carId = @carId, userId = @userId, status =  @status WHERE id = @id";

        MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
        [
           new("@id", id),
           new("@title", auction.title),
           new("@startTime", auction.startTime),
           new("@endTime", auction.endTime),
           new("@highestBid", auction.highestBid),
           new("@carId", auction.carId),
           new("@userId", auction.userId),
           new("@status", auction.status)
        ]);

        return TypedResults.Created();

    }

}

