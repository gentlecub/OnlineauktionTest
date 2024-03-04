import Countdown from "react-countdown";
function BidItem({ item }) {
  let date = new Date(item.duration);
  const day = date.getDate();
  const namemonths = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const moth = namemonths[date.getMonth()];
  const year = date.getFullYear();
  const renderer = ({ hours, minutes }) => {
    return (
      <span className="align-middle fs-4">
        {hours}hr :{minutes} min
      </span>
    );
  };

  return (
    <>
      <div className="card">
        <div className="text-center">
          <div className="row">
            <div className="col">
              <span className="fs-6">Termina :</span>
              <br />
              <span> {`${day} ${moth} ${year}`}</span>
            </div>
            <div className="col" style={{ paddingTop: "10px" }}>
              <Countdown date={date.getTime()} renderer={renderer} />
            </div>
          </div>
        </div>
        <div className=" text-center">
          <p className="fs-5">$ {item.price} </p>
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto b-1"
          style={{ paddingBottom: "10px" }}
        >
          <button className="btn btn-outline-secondary" type="button">
            Bid
          </button>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" key={1}>
            An item
          </li>
          <li className="list-group-item" key={2}>
            A second item
          </li>
          <li className="list-group-item" key={3}>
            A third item
          </li>
        </ul>
      </div>
    </>
  );
}

export default BidItem;
