using MySql.Data.MySqlClient;

using System.Data;

namespace Onlineauction
{
    public class Bids
    {
        public record Bid(int id, int auctionId, int bidAmount, int userId);

        public static List<Bids> All(State state)
        {

            List<Bid> bids = new();
            string strInfo = "";
            MySqlCommand command = new("SELECT * FROM bids", state.DB);

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                int auctionId = reader.GetInt32("auctionId");
                int bidAmount = reader.GetInt32("bidAmount");
                int userId = reader.GetInt32("userId");
                bids.Add(new(id, auctionId, bidAmount, userId));

                strInfo += $"{auctionId} has bidAmount: {bidAmount}, userId: {userId}\n";
                Console.WriteLine(strInfo);
            }
            return bids;
        }
    }
}