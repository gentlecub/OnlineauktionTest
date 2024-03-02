import Countdown from "react-countdown";


const renderer = ({ days, hours, minutes, seconds, props }) => {
  
  
  return (
 
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />

        <div className="card-body">
          <p className="lead display-6">{props.item.brand}</p>
          <div className="d-flex jsutify-content-between align-item-center">
            <h5>
              {days * 24 + hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="card-text">{props.item.desc}</p>
          <div className="d-flex justify-content-between align-item-center">
            <p className="display-6">${props.item.mileage}</p>
          </div>
        </div>
      </div>
    </div>
  
  );
};

const AuctionCard = ( {item} ) => {  
  let expiredDate = new Date(item.duration).getTime()
  return (
   
    <Countdown
      date = {expiredDate}
      item ={item}
      renderer = {renderer}
    />
  );
};

export default AuctionCard