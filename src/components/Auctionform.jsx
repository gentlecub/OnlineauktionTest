import { useState } from "react";

function AuctionForm({ onSubmit, auction}){

    // should include user
    
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


            const auctionResponse = await fetch('/api/Auctions', {
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={formState.brand}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Model:
                    <input
                        type="text"
                        name="model"
                        value={formState.model}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="number"
                        name="year"
                        value={formState.year}
                        onChange={handleChange}
                        />
                </label>
                <label>
                    Color:
                    <input
                        type="text"
                        name="color"
                        value={formState.color}
                        onChange={handleChange}
                        />
                </label>
                <label>
                    Mileage:
                    <input
                        type="number"
                        name="mileage"
                        value={formState.mileage}
                        onChange={handleChange}
                        />
                </label>
                <label>
                    Engine Type:
                    <input
                        type="text"
                        name="engineType"
                        value={formState.engineType}
                        onChange={handleChange}
                        />
                </label>
                <label>
                    Engine Displacement:
                    <input
                        type="text"
                        name="engineDisplacement"
                        value={formState.engineDisplacement}
                        onChange={handleChange}
                        />
                </label>
                <label>
                    Transmission:
                    <select
                        name="transmission"
                        value={formState.transmission}
                        onChange={handleChange}
                        >
                        <option value="">Select Transmission</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                    </select>
                </label>
                <label>
                    Features:
                    <input
                        type="text"
                        name="features"
                        placeholder="Enter features separated by commas"
                        value={formState.features.join(', ')}
                        onChange={handleFeatureChange}
                        />
                </label>
            </div>
            



            <label>
                Start Time:
                <input
                    type="datetime-local"
                    name="startTime"
                    value={formState.startTime}
                    onChange={handleChange}
                />
            </label>
            <label>
                End Time:
                <input
                    type="datetime-local"
                    name="endTime"
                    value={formState.endTime}
                    onChange={handleChange}
                />
            </label>
            <label>
                Highest Bid:
                <input
                    type="number"
                    name="highestBid"
                    value={formState.highestBid}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Save Auction</button>
        </form>
    );
}


export default AuctionForm;