import { useState } from "react";
function RegisterUser () {
  function successfullRegister () {
    const [ users, setUsers ] = useState( [
    ] );

    useEffect( () => {
      async function load () {
        const response = await fetch( '/api/users' )
        const users = await response.json()
        setUsers( users )
      }
      load()
    }, [] )
    const handleSelect = ( id ) => {
      const listItems = users.map( ( item ) => item.id === id )
      setUsers( listItems )
      console.log( listItems )
    }
  }

  return <>
    <main>
      <div class="user">
        <div class="form-group">
          <label for="exampleFormControlInput1">Username</label>
          <input type="username" className="form-control" id="exampleFormControlInput1" placeholder="username" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="namn12345" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Name</label>
          <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="fullname" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Email</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="namn@exempel.se" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Roll</label>
          <input type="roll" className="form-control" id="exampleFormControlInput1" placeholder="Admin or User?" />
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={ successfullRegister } class="btn btn-outline-dark">Register</button>
        </div>
      </div>
    </main>
  </>

}
export default RegisterUser