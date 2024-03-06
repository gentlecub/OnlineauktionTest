import AuctionForm from "../components/Auctionform";

function UserPage(){

    // must be connected to user

    
    const handleAuctionSubmit = (auctionData) => {
        console.log(auctionData)
    }


    return(
        <div>
            <h1>User Dashboard</h1>
            <AuctionForm onSubmit={handleAuctionSubmit} />

        </div>
    )

}


export default UserPage;