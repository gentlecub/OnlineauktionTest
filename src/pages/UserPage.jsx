import AuctionForm from "../components/Auctionform";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UserPage () {

    const { logout } = useContext( AuthContext );

    // must be connected to user & should only be visible when user is logged in

    const [ showForm, setShowForm ] = useState( false );


    const handleAuctionSubmit = ( auctionFormData ) => {
        console.log( auctionFormData, "Was created in the Database." )
        setShowForm( false );
    }


    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <h1>User Dashboard</h1>



            <div>
                { showForm ? ( <AuctionForm onSubmit={ handleAuctionSubmit } closeForm={ () => setShowForm( false ) } /> ) :
                    ( <button className="btn btn-primary" onClick={ () => setShowForm( true ) }> Create new Auction </button> ) }
            </div>


            <div>
                <br></br>
                <button onClick={ logout } className="btn btn-primary" >Logout</button>
            </div>


        </>
    )

}


export default UserPage;