import AuctionForm from "../components/Auctionform";
import { useState } from "react";

function UserPage(){

    // must be connected to user & should only be visible when user is logged in

    const [showForm, setShowForm] = useState(false);

    
    const handleAuctionSubmit = (auctionFormData) => {
        console.log(auctionFormData + "Was created in the Database.")
        setShowForm(false);
    }


    return (

        <div><br />
            <h3>User Dashboard</h3><br />
            { showForm ? ( <AuctionForm onSubmit={handleAuctionSubmit} closeForm = {() => setShowForm(false)} />) : 
                ( <button className="btn btn-primary" onClick={ () => setShowForm( true ) }> Create new Auction </button> ) }
            <br /><br />
        </div>
    )

}


export default UserPage;