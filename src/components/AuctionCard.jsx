import Countdown from "react-countdown";

const AuctionCard = ({ item }) => {
  if (!item || !item.brand) {
    return null; 
  }

  // Anonym funktion för att omsluta din renderer-funktion och skicka dina önskade props
  const renderer = ({ days, hours, minutes }) => {
    return (
      <>
        <div className="col">
          <div className="card shadow-sm">
            <div
              style={{
                height: "320px",
                backgroundImage: `url(https://media.istockphoto.com/id/1157655660/es/foto/suv-rojo-gen%C3%A9rico-sobre-un-fondo-blanco-vista-lateral.jpg?s=612x612&w=0&k=20&c=0I2xA9oCnNUfluy5m1ErkM4NwHQOkhDUr2HwKXNO1z8=)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="w-100"
            />

            <div className="card-body">
              <p className="lead display-6">{item.brand}</p>
              <div className="d-flex jsutify-content-between align-item-center">
                <h5>
                  {days}days {hours} hr: {minutes} min:
                </h5>
              </div>
              <p className="card-text">{item.desc}</p>
              <div className="d-flex justify-content-between align-item-center">
                <p className="display-6">${item.price}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  let expiredDate = new Date(item.duration).getTime();
  return <Countdown date={expiredDate} item={item} renderer={renderer} />;
};

export default AuctionCard;
