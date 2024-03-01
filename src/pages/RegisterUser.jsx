import NewUser from "../components/NewUser.jsx";

function RegisterUser () {
  
  return (
    <div>
      <form onSubmit={ NewUser }>
        <br />
        <h3>User Registration</h3><br/>
        <label>Username:</label><br /><input type="text" name="Username" placeholder="UserName..." /><br />
        <label>Password:</label><br /><input type="password" name="password" placeholder="Password..." /><br />
        <label>Name:</label><br /><input type="text" name="name" placeholder="Name..." /><br />
        <label>Email:</label><br /><input type="text" name="Email" placeholder="exemple@auction.se..." /><br />
        <label>Roll:</label><br /><input type="text" name="roll" placeholder="admin or user?..." /><br /><br />
        <input type="submit" value="Register" />
      </form>

    </div>
   

  )
    

}
export default RegisterUser