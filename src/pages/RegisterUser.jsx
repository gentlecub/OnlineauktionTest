import NewUser from "../components/NewUser.jsx";

function RegisterUser () {
  function successfullRegister () {
   
    return (
      <NewUser/>
    )
  }

  return <>
    <main>
      <div className="user">
        <div className="form-group">
          <label >Id</label>
          <input type="id" className="form-control" placeholder="id" />
        </div>
        <div className="form-group">
          <label >Username</label>
          <input type="username" className="form-control"  placeholder="username" />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="password" className="form-control"  placeholder="namn12345" />
        </div>
        <div className="form-group">
          <label >Name</label>
          <input type="name" className="form-control"  placeholder="fullname" />
        </div>
        <div className="form-group">
          <label >Email</label>
          <input type="email" className="form-control"  placeholder="namn@exempel.se" />
        </div>
        <div className="form-group">
          <label >Roll</label>
          <input type="roll" className="form-control"  placeholder="Admin or User?" />
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={ successfullRegister } className="btn btn-outline-dark">Register</button>
        </div>
      </div>
    </main>
  </>

}
export default RegisterUser