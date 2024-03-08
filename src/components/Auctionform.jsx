import { useState } from "react";

function AuctionForm({ onSubmit, closeForm, auction}){

    // should include user
    // create validation

    const [formState, setFormState] = useState(
        {
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
        highestBid: auction?.highestBid || '',

        /*     "userId": and  "status": must be added */ 
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState, [name]: value,
        }));
    };


    const handleFeatureChange = (e) => {
        const features = e.target.value.split(',').map(feature => feature.trim());
        setFormState(prevState => ({ ...prevState, features}))
    }


    /* const validateForm = () => {
        return formState.brand && formState.model && formState.year;
    } */


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const carData = {
            brand: formState.brand,
            model: formState.model,
            year: formState.year,
            color: formState.color,
            mileage: formState.mileage,
            engine: {
              type: formState.engineType,
              displacement: formState.engineDisplacement,
            },
            transmission: formState.transmission,
            features: formState.features,
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
                startTime: formState.startTime,
                endTime: formState.endTime,
                highestBid: formState.highestBid,
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
                    <input type="text" className="form-control" id="brand" name="brand" value={formState.brand} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="model" className="form-label">Model:</label>
                    <input type="text" className="form-control" id="model" name="model" value={formState.model} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="year" className="form-label">Year:</label>
                    <input type="number" className="form-control" id="year" name="year" value={formState.year} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="color" className="form-label">Color:</label>
                    <input type="text" className="form-control" id="color" name="color" value={formState.color} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="mileage" className="form-label">Mileage:</label>
                    <input type="number" className="form-control" id="mileage" name="mileage" value={formState.mileage} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="engineType" className="form-label">Engine Type:</label>
                    <input type="text" className="form-control" id="engineType" name="engineType" value={formState.engineType} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="engineDisplacement" className="form-label">Engine Displacement:</label>
                    <input type="text" className="form-control" id="engineDisplacement" name="engineDisplacement" value={formState.engineDisplacement} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="transmission" className="form-label">Transmission:</label>
                    <select className="form-select" id="transmission" name="transmission" value={formState.transmission} onChange={handleChange}>
                    <option value="">Select Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="features" className="form-label">Features:</label>
                    <input type="text" className="form-control" id="features" name="features" placeholder="Enter features separated by commas" value={formState.features.join(', ')} onChange={handleFeatureChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="startTime" className="form-label">Start Time:</label>
                    <input type="datetime-local" className="form-control" id="startTime" name="startTime" value={formState.startTime} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="endTime" className="form-label">End Time:</label>
                    <input type="datetime-local" className="form-control" id="endTime" name="endTime" value={formState.endTime} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="highestBid" className="form-label">Highest Bid:</label>
                    <input type="number" className="form-control" id="highestBid" name="highestBid" value={formState.highestBid} onChange={handleChange} />
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