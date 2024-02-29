import NewUser from "../components/NewUser.jsx";

function RegisterUser () {
  
  return (
    <div>
      <form onSubmit={NewUser}>
                <h1>User Registration</h1>
                <label>Username :</label> <input type="text" name="Username" placeholder="UserName..." /><br />
        <label>Password :</label> <input type="password" name="password" placeholder="Password..." /><br />
        <label>Name :</label> <input type="text" name="name" placeholder="Name..." /><br />
        <label>Email :</label> <input type="text" name="Email" placeholder="exemple@auction.se..." /><br />
        <label>Roll :</label> <input type="text" name="roll" placeholder="admin or user?..." /><br />
        <input type="submit" value="Register" />
            </form>

    </div>
   

  )
    

}
export default RegisterUser