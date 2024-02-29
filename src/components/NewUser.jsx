import React, { useEffect, useState } from "react";

function NewUser () {
  const [ users, setUsers ] = useState( [
  ] );

  useEffect( () => {
    async function load () {
      const response = await fetch( '/api/Users' )
      const users = await response.json()
      setUsers( users )
    }
    load()
  }, [] )
  const handleSelect = ( id ) => {
    const filteredUsers = users.filter( ( item ) => item.id === id )
    setUsers( filteredUsers )
    console.log( filteredUsers )
    
    return (
  <h1>Hello</h1>
)
  }

  }
export default NewUser