import './UsernameChange.css'; 
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 

export default function UsernameChange() {
    useEffect(()=>{
        console.log(document.cookie); 
    });
    const [addUsername, changeUsername] = useState(''); 
    async function submitUsername() {
        console.log(addUsername);
        const jwt = document.cookie.substring(document.cookie.indexOf('jwt=')+4)
        const config = {
            headers: {
                'Authentication': `Bearer ${jwt}`
            }
        };
        await axios.post('http://localhost:8000/auth/join/changeusername',
            {
                username: addUsername
            },config); 
    }
    return (
        <form>
            <input type='text' placeholder='username' onChange={name => changeUsername(name)}/>
            <button onClick={submitUsername}>submit</button>
        </form>
    );
}