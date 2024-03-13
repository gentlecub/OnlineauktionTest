import { useState, useContext } from "react";
import {AuthContext} from '../context/AuthContext.jsx'


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


function AuctionForm({ onSubmit, closeForm, auction}){
    
    const {user} = useContext(AuthContext)

    const [auctionForm, setAuctionForm] = useState(
        {
        userId: user?.id || undefined,
        
        brand: auction?.brand || '',
        model: auction?.model || '',
        year: auction?.year || '',
        color: auction?.color || '',
        mileage: auction?.mileage || '',
        engineType: auction?.engine?.type || '',
        engineDisplacement: auction?.engine?.displacement || '',
        transmission: auction?.transmission || '',
        features: auction?.features || [],


        title: auction?.title || '',
        startDate: auction?.startDate || formatDateTime(new Date()),
        endDate: auction?.endDate || '',
        highestBid: auction?.highestBid || ''

        // "status": must be added */ 
    });



    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setAuctionForm(prevState => ({
            ...prevState, [name]: value,
        }));
    };


    const handleFeatureChange = (e) => {
        const features = e.target.value.split(',').map(feature => feature.trim());

        setAuctionForm(prevState => ({ ...prevState, features}))
    }


    const validateForm = () => {
        const errors = {};

        if(!user.id){
            errors.userId = 'No user found.'
        }

        if (!auctionForm.brand){
            errors.brand = 'Brand is required.'
        }

        if (!auctionForm.model){
            errors.model = 'Model is required.'
        }

        if(!auctionForm.year || auctionForm.year < 1900 || auctionForm.year > new Date().getFullYear() + 1){
          errors.year = 'Invalid year.'
        }


        const endDateTime = new Date(auctionForm.endDate)

        if(!auctionForm.endDate || endDateTime <= new Date(auctionForm.startDate)){
          errors.endDate = 'End date must be in the future'
        }

        if (!auctionForm.color){
            errors.color = 'Color is required.'
        }

        if (!auctionForm.mileage || isNaN(auctionForm.mileage) || auctionForm.mileage < 0){
            errors.mileage = 'Please enter valid mileage.'
        }

        if (!auctionForm.engineType){
            errors.engineType = 'Please enter engine type.'
        }

        if (!auctionForm.engineDisplacement){
            errors.engineDisplacement = 'Please enter engine displacement.'
        }

        if(!auctionForm.transmission || auctionForm.transmission === ''){
          errors.transmission = 'Transmission type is required.'
        }

        if (!auctionForm.highestBid  || auctionForm.highestBid < 0){
            errors.highestBid = 'Please enter a valid starting bid.'
        }

        return errors
    } 
      
    const handleSubmit = async (e) => {
        e.preventDefault();


        const errors = validateForm();

        if(Object.keys(errors).length > 0 ){
            console.error(errors)
            return;
        }
        
        const carData = {
            brand: auctionForm.brand,
            model: auctionForm.model,
            year: auctionForm.year,
            color: auctionForm.color,
            mileage: auctionForm.mileage,
            engine: {
              type: auctionForm.engineType,
              displacement: auctionForm.engineDisplacement,
            },
            transmission: auctionForm.transmission,
            features: auctionForm.features,
        };
          
        

        try {
            const carRespone = await fetch('/api/cars', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(carData)
            });
    

            if (!carRespone.ok) throw new Error('Problem posting car data');
           
            
            const car = await carRespone.json();
    

            const auctionData = {
                startTime: auctionForm.startDate,
                endTime: auctionForm.endDate,
                highestBid: auctionForm.highestBid,
                userId: auctionForm.userId,
                carId: car.id,
            };


            const auctionResponse = await fetch('/api/auctions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(auctionData)
            });


            if (!auctionResponse.ok) throw new Error('Problem posting auction data');

            const auction = await auctionResponse.json()

            onSubmit({car, auction})
        }
        catch (error){
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