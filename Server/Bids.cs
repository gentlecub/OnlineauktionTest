using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;



namespace Onlineauction
{
  public class Bids
  {
    public record Bid(int id, int auctionId, decimal bidAmount, string userId);

    public static List<Bid> All(State state)
    {
      List<Bid> bids = new();
      string strInfo = "";

      string query = "SELECT * FROM bid";
      var reader = MySqlHelper.ExecuteReader(state.DB, query);

      while (reader.Read())
      {
        int id = reader.GetInt32("id");
        int auctionId = reader.GetInt32("auctionId");
        decimal bidAmount = reader.GetDecimal("bidAmount");
        string userId = reader.GetString("userId");
        bids.Add(new Bid(id, auctionId, bidAmount, userId));

        strInfo += $"Bid id: {id}, Auction ID: {auctionId}, Bid Amount: {bidAmount}, User ID: {userId}\n";
        Console.WriteLine(strInfo);
      }
      return bids;
    }

    public static IResult PostBid(Bid bid, State state)
    {
      string strQuery = "INSERT INTO bid (auctionId, bidAmount, userId) " +
                        "VALUES (@auctionId, @bidAmount, @userId)";

      MySqlHelper.ExecuteNonQuery(state.DB, strQuery,
      [
        new("@auctionId", bid.auctionId),
        new("@bidAmount", bid.bidAmount),
        new("@userId", bid.userId)
      ]);

      return TypedResults.Created();
    }
  }
}