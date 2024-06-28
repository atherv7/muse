import './Login.css'; 

export default function Login() {
    return(
        <div id='login_main'>
            <div id='login_path_holder'>
                <h1>great to have you here</h1>
                <button>login w google</button>
                <button>login w facebook</button>
                <form>
                    <input type='text' />
                    <input type='submit'/>
                </form>
            </div>
        </div>
    ); 
}