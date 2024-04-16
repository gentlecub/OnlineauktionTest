import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext.jsx'


function formatDateTime(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const hour = `${d.getHours()}`.padStart(2, '0');
  const minute = `${d.getMinutes()}`.padStart(2, '0');
  const second = `${d.getSeconds()}`.padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function formatEndTime(date) {

  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;

}

function AuctionForm({ onSubmit, closeForm, auction }) {

  console.log('Sent to AuctionForm: ', auction)
  const { user } = useContext(AuthContext)

  const [auctionForm, setAuctionForm] = useState(
    {
      userId: user?.id || undefined,

      brand: auction?.brand || '',
      model: auction?.model || '',
      year: auction?.year || '',
      color: auction?.color || '',
      mileage: auction?.mileage || '',
      engine_type: auction?.engineType || '',
      engine_displacement: auction?.engineDisplacement || '',
      transmission: auction?.transmission || '',
      features: auction?.features || [],
      featuresOneLine: auction?.featuresOneLine || '',
      price: auction?.price || '',
      imageUrl: auction?.imageUrl || '',

      title: auction?.title || '',
      startDate: auction?.startTime || formatDateTime(new Date()),
      endDate: formatEndTime(auction?.endTime) || '',
      highestBid: auction?.highestBid || '',
      status: '0'

      // "status": must be added */ 
      // add place for image url
    });



  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuctionForm(prevState => ({
      ...prevState, [name]: value,
    }));
  };


  const handleFeatureChange = (e) => {
    // let featuresOneLine = e.target.value;
    const features = e.target.value.split(',').map(feature => feature.trim());

    setAuctionForm(prevState => ({ ...prevState, features }))
    // setAuctionForm(prevState => ({ ...prevState, featuresOneLine }))
  }


  const validateForm = () => {
    const errors = {};

    if (!user.id) {
      errors.userId = 'No user found.'
    }

    if (!auctionForm.brand) {
      errors.brand = 'Brand is required.'
    }

    if (!auctionForm.model) {
      errors.model = 'Model is required.'
    }

    if (!auctionForm.year || auctionForm.year < 1900 || auctionForm.year > new Date().getFullYear() + 1) {
      errors.year = 'Invalid year.'
    }


    const endDateTime = new Date(auctionForm.endDate)
    const lastEditedDate = new Date()

    if (!auctionForm.endDate || endDateTime <= new Date(auctionForm.startDate) || endDateTime <= lastEditedDate) {
      errors.endDate = 'End date must be in the future'
    }

    if (!auctionForm.color) {
      errors.color = 'Color is required.'
    }

    if (!auctionForm.imageUrl) {
      errors.imageUrl = 'ImageURL not found.'
    }

    if (!auctionForm.mileage || isNaN(auctionForm.mileage) || auctionForm.mileage < 0) {
      errors.mileage = 'Please enter valid mileage.'
    }

    if (!auctionForm.engineType) {
      errors.engineType = 'Please enter engine type.'
    }

    if (!auctionForm.engineDisplacement) {
      errors.engineDisplacement = 'Please enter engine displacement.'
    }

    if (!auctionForm.transmission || auctionForm.transmission === '') {
      errors.transmission = 'Transmission type is required.'
    }

    if (!auctionForm.highestBid || auctionForm.highestBid < 0) {
      errors.highestBid = 'Please enter a valid starting bid.'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.error(errors)
      return;
    }

    const lastEditedDate = formatDateTime(new Date())
    const imageAlt = `${auctionForm.year} ${auctionForm.brand} ${auctionForm.model}`

    const carData = {
      brand: auctionForm.brand,
      model: auctionForm.model,
      price: auctionForm.highestBid,
      year: auctionForm.year,
      color: auctionForm.color,
      imageUrl: auctionForm.imageUrl,
      mileage: auctionForm.mileage,
      engine_type: auctionForm.engineType,
      engine_displacement: auctionForm.engineDisplacement,
      transmission: auctionForm.transmission,
      features: auctionForm.features.join(', ')
    };

    const method = auction?.id ? 'PUT' : 'POST'
    const carEndpoint = auction?.id ? `/api/cars/${auction.carId}` : '/api/cars/getid';
    const auctionEndpoint = auction?.id ? `/api/auctions/${auction.id}` : '/api/auctions';

    try {
      const carResponse = await fetch(carEndpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
      });

      const carId = carResponse.headers.get("Location")

      if (!carResponse.ok) throw new Error(`Problem posting car data (with method: ${method}).`);

      // Add current hour, minute and seconds to end-date.
      const endDateWithTime = new Date(auctionForm.endDate);
      endDateWithTime.setHours(new Date().getHours());
      endDateWithTime.setMinutes(new Date().getMinutes());
      endDateWithTime.setSeconds(new Date().getSeconds());

      const formattedEndTime = formatDateTime(endDateWithTime);
      const auctionData = {
        title: auctionForm.title,
        startTime: auctionForm.startDate,
        endTime: formattedEndTime,
        highestBid: auctionForm.highestBid,
        carId: carId,
        userId: auctionForm.userId,
        status: auctionForm.status
      };

      const auctionResponse = await fetch(auctionEndpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auctionData)
      });

      if (!auctionResponse.ok) throw new Error(`Problem posting auction data (with method: ${method}).`);

      if (carResponse.ok && auctionResponse.ok) {
        alert("The car and auction data is now saved in the database!")
      }

    }
    catch (error) {
      console.error(error)
      alert(error.message)
    }
  };

  return (
    <div className="auction-form-container">
      <form onSubmit={handleSubmit} className="container bg-light p-4 my-5 rounded" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="row g-2">

          <div className="col-12">
            <div className="card mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">Auction Details</div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={auctionForm.title} onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">End Date:</label>
                        <input type="date" className="form-control" id="endDate" name="endDate" value={auctionForm.endDate} onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="highestBid" className="form-label">Starting Bid:</label>
                        <input type="number" className="form-control" id="highestBid" name="highestBid" value={auctionForm.highestBid} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-header">Car Details</div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="brand" className="form-label">Brand:</label>
                    <input type="text" className="form-control" id="brand" name="brand" value={auctionForm.brand} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="model" className="form-label">Model:</label>
                    <input type="text" className="form-control" id="model" name="model" value={auctionForm.model} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="year" className="form-label">Year:</label>
                    <input type="number" className="form-control" id="year" name="year" value={auctionForm.year} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="color" className="form-label">Color:</label>
                    <input type="text" className="form-control" id="color" name="color" value={auctionForm.color} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                    <input type="text" className="form-control" id="imageUrl" name="imageUrl" placeholder="Enter image URL" value={auctionForm.imageUrl} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mileage" className="form-label">Mileage:</label>
                    <input type="number" className="form-control" id="mileage" name="mileage" value={auctionForm.mileage} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="engineType" className="form-label">Engine Type:</label>
                    <input type="text" className="form-control" id="engineType" name="engineType" value={auctionForm.engineType} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="engineDisplacement" className="form-label">Engine Displacement:</label>
                    <input type="text" className="form-control" id="engineDisplacement" name="engineDisplacement" value={auctionForm.engineDisplacement} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="transmission" className="form-label">Transmission:</label>
                    <select className="form-select" id="transmission" name="transmission" value={auctionForm.transmission} onChange={handleChange}>
                      <option value="">Select Transmission</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="features" className="form-label">Features:</label>
                    <input type="text" className="form-control" id="features" name="features" placeholder="Enter features separated by commas" value={auctionForm.features.join(', ')} onChange={handleFeatureChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-lg ms-md-2">Save Auction</button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={closeForm}>Cancel</button>
        </div>

      </form>
    </div>

  );

}

export default AuctionForm;