import AuctionForm from "../components/Auctionform";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import AuctionCard from "./AuctionCard";







function UserDashboard(){




    const {carItem, auction } = useContext( GlobalContext );
    const { logout, user } = useContext( AuthContext );
    console.log('Desmond Car::  ', carItem);
    console.log('Desmond Auction::  ', auction);

    const userAuctions = auction.filter(auction => auction.userId === user.id)
    const userCars = userAuctions.filter(auction => carItem.id === auction.carId)
    
    // console.log('Userauctions: ', userAuctions)
    // console.log('Usercars: ', userCars)
    



    // must be connected to user & should only be visible when user is logged in

    const [ showForm, setShowForm ] = useState( false );


    const handleAuctionSubmit = ( auctionFormData ) => {
        console.log( auctionFormData, "Was created in the Database." )
        alert('Auction created successfully.')
        setShowForm( false );
    }


    const handleLogout = () => {
        alert('Goodbye')
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
                <button onClick={ handleLogout } className="btn btn-primary" >Logout</button>
            </div>


        </>
    )

}

export default UserDashboard;