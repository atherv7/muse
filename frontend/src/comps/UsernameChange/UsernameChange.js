import './UsernameChange.css'; 
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 

export default function UsernameChange() {
    useEffect(()=>{
        console.log(document.cookie); 
    });
    const [addUsername, changeUsername] = useState(''); 
    function submitUsername() {
        console.log(addUsername);
        const jwt = document.cookie.substring(document.cookie.indexOf('jwt=')+4);
        console.log(jwt); 
        axios.post('http://localhost:8000/auth/join/changeusername',
            {
                'username': addUsername
            },
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            })
            .then(response => {
                if(response.status === 200) {
                    window.location.href = 'http://localhost:3000/museum'; 
                }
            })
            .catch(error => {
                console.log(error); 
            });  
    }
    return (
        <div>
            <input type='text' placeholder='username' onChange={event => changeUsername(event.target.value)}/>
            <input type='submit' onClick={submitUsername}/>
        </div>
    );
}