namespace Onlineauction;

using System.Data;
using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;

public class Cars
{
  public record Car(int id, string brand, string model, double price, int year, string color, string imageUrl, int mileage, string engine_type, string engine_displacement, string transmission, string features, double duration = 0);

  //get the cars that are up for auction
  public static List<Car> GetCarsHome(State state)
  {
    List<Car> cars = new();
    List<Car> updatedCars = new();
    try
    {
      var carQuery = @"
                      SELECT c.id, c.brand, c.model, c.price, c.year, c.color, c.imageUrl, c.mileage, c.engine_type, c.engine_displacement, 
                      c.transmission, c.features, a.title, a.startTime, a.endTime, a.highestBid, a.userId, a.status, a.endTime
                      FROM cars AS c
                      JOIN auctions AS a ON c.id = a.carId;
                      ";

      var reader = MySqlHelper.ExecuteReader(state.DB, carQuery);

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
         var endTime = reader.GetDateTime(reader.GetOrdinal("endTime"));
         var durationHrs = Math.Abs((endTime - DateTime.Now).TotalHours);
         cars.Add(new(id, brand, model, price, year, color, imageUrl, mileage, engine_type, engine_displacement, transmission, features, durationHrs));
    }

      return cars;
    }
    catch (MySqlException ex)
    {

      return cars;
    }
  }

  //get all the cars
  public static List<Car> GetAllCars(State state)
  {
    List<Car> cars = new();
    try
    {
      var carQuery = "SELECT * FROM cars;";

      var reader = MySqlHelper.ExecuteReader(state.DB, carQuery);

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
         cars.Add(new(id, brand, model, price, year, color, imageUrl, mileage, engine_type, engine_displacement, transmission, features));
      }

      return cars;
    }
    catch (MySqlException ex)
    {

      return cars;
    }
  }

  //get car by id 
  public static Car GetCarId(int id, State state)
  {
    string query = "SELECT * FROM cars WHERE id = @id";

    var reader = MySqlHelper.ExecuteReader(state.DB, query, [ new("@id", id) ]);

    if (reader.Read())
    {
       int idCar = reader.GetInt32(reader.GetOrdinal("id"));
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

       Car carItem = new(idCar, brand, model, price, year, color, imageUrl, mileage, engine_type, engine_displacement, transmission, features);
       return carItem;
    }
    else
    {
       return null;
    }

  }

}



