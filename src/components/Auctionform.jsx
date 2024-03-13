import { useState, useContext } from "react";
import {AuthContext} from '../context/AuthContext.jsx'

function AuctionForm({ onSubmit, closeForm, auction}){
    
    const {user} = useContext(AuthContext)

    // should include user
    // create validation
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

        startTime: auction?.startTime || '',
        endTime: auction?.endTime || '',
        highestBid: auction?.highestBid || ''

        /*     "userId": and  "status": must be added */ 
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
        
        // Add validations for start/end-time + more

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
                startTime: auctionForm.startTime,
                endTime: auctionForm.endTime,
                highestBid: auctionForm.highestBid,
                userId: auctionForm.userId,
                carId: car.id
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
 

            <form onSubmit={handleSubmit} className="container bg-light p-4 my-5 border rounded" style={{ backdropFilter: 'blur(10px)' }}>
            <button className="close-button" onClick={closeForm}>X</button>

                <div className="row g-2">
                <div className="col-md-6 mb-3">
                    <label htmlFor="brand" className="form-label">Brand:</label>
                    <input type="text" className="form-control" id="brand" name="brand" value={auctionForm.brand} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="model" className="form-label">Model:</label>
                    <input type="text" className="form-control" id="model" name="model" value={auctionForm.model} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="year" className="form-label">Year:</label>
                    <input type="number" className="form-control" id="year" name="year" value={auctionForm.year} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="color" className="form-label">Color:</label>
                    <input type="text" className="form-control" id="color" name="color" value={auctionForm.color} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="mileage" className="form-label">Mileage:</label>
                    <input type="number" className="form-control" id="mileage" name="mileage" value={auctionForm.mileage} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="engineType" className="form-label">Engine Type:</label>
                    <input type="text" className="form-control" id="engineType" name="engineType" value={auctionForm.engineType} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="engineDisplacement" className="form-label">Engine Displacement:</label>
                    <input type="text" className="form-control" id="engineDisplacement" name="engineDisplacement" value={auctionForm.engineDisplacement} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="transmission" className="form-label">Transmission:</label>
                    <select className="form-select" id="transmission" name="transmission" value={auctionForm.transmission} onChange={handleChange}>
                    <option value="">Select Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="features" className="form-label">Features:</label>
                    <input type="text" className="form-control" id="features" name="features" placeholder="Enter features separated by commas" value={auctionForm.features.join(', ')} onChange={handleFeatureChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="endTime" className="form-label">End Time:</label>
                    <input type="datetime-local" className="form-control" id="endTime" name="endTime" value={auctionForm.endTime} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="highestBid" className="form-label">Starting Bid:</label>
                    <input type="number" className="form-control" id="highestBid" name="highestBid" value={auctionForm.highestBid} onChange={handleChange} />
                </div>
                
                </div>
                <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg">Save Auction</button>
                </div>
            </form>
        </div>
        );
        
}


export default AuctionForm;