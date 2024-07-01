import './Login.css';

export default function Login() {
    function handleLogin() {
      window.location.href = 'http://localhost:8000/auth/join/google'; 
    }
    return(
        <div id='login_main'>
            <div id='login_path_holder'>
                <h1>great to have you here</h1>
                <button onClick={handleLogin}>login w google</button>
                <button>login w facebook</button>
                <form>
                    <input type='text' />
                    <input type='submit'/>
                </form>
            </div>
        </div>
    );
}
