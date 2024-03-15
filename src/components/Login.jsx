import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import {useContext} from 'react';


function Login () {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        const response = await fetch('/api/users');
        const users = await response.json()


        const user = users.find(user => user.username === username && user.password === password);

        if(user) {
            login(user)
           // console.log(user, 'Logged in successfully.')
            navigate('/userpage')
        }else{
          //  console.log(user, 'Failed to login')
        }
    };


    return (
      <form onSubmit={ ( handleSubmit ) }>
        <label>Username:</label><br /> <input type="text" name="username" placeholder="Username" /><br /><br />
        <label>Password:</label><br /><input type="password" name="password" placeholder="Password" /><br /><br />
            <input type="submit" value="Login" /> 
        </form>
    );
}



export default Login