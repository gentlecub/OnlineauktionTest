namespace Onlineauction;

using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;

public class Cars
{
  public record Car(int id, string brand, string model, double price, int year, string color, string imageUrl, int mileage, string engine_type, string engine_displacement, string transmission, string features, double duration = 0);

  //Get the cars that are up for auction
  public static List<Car> GetCarsHome(State state)
  {
    List<Car> cars = new();
    List<Car> updatedCars = new();
    try
    {
      var carQuery = "SELECT * FROM cars;";
      using (var command = new MySqlCommand(carQuery, state.DB))
      {
        using (var reader = command.ExecuteReader())
        {
          while (reader.Read())
          {
            int id = reader.GetInt32(reader.GetOrdinal("id"));
            string brand = reader.GetString("brand");
            string model = reader.GetString("model");
            double price = reader.GetDouble("price");
            int year = reader.GetInt32("year");
            string color = reader.GetString("color");
            string imageUrl = reader.GetString("imageUrl");
            int mileage = reader.GetInt32("mileage");
            string engine_type = reader.GetString("engine_type");
            string engine_displacement = reader.GetString("engine_displacement");
            string transmission = reader.GetString("transmission");
            string features = reader.GetString("features");

            cars.Add(new(id, brand, model, price, year, color, imageUrl, mileage, engine_type, engine_displacement, transmission, features)); // Agregar el objeto car a la lista carItems
          }
        }

      }
      var durationDict = new Dictionary<int, double>();
      string durationQuery = "SELECT carId, endTime FROM auctions;";

      using (var command = new MySqlCommand(durationQuery, state.DB))
      {
        using (var reader = command.ExecuteReader())
        {
          while (reader.Read())
          {
            var carId = reader.GetInt32(reader.GetOrdinal("carId"));
            var endTime = reader.GetDateTime(reader.GetOrdinal("endTime"));
            var durationHrs = Math.Abs((endTime - DateTime.Now).TotalHours);
            durationDict.Add(carId, durationHrs);
          }

        }

      }
      foreach (var car in cars)
      {
        var duration = durationDict.ContainsKey(car.id) ? durationDict[car.id] : 0;
        var updatedCar = car with { duration = duration };
        updatedCars.Add(updatedCar);


      }


      return updatedCars;
    }
    catch (MySqlException ex)
    {

      return cars;
    }
  }


}