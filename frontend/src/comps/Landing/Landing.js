import './Landing.css';
import Title from './Title/Title';
import { useState } from 'react'; 

export default function Landing() {
  const [animate, setAnimate] = useState(false); 
  const sleep = ms => new Promise(r=>setTimeout(r,ms));
  async function goToAuthenticate() {
    setAnimate(true); 
    await sleep(950);
    document.getElementById('join_button').style.display = 'none';
    await sleep(10); 
    window.location.href = 'http://localhost:3000/login'; 
  }

  return (
    <div id='landing'>
      <div>
        <Title movetitle={animate}/>
      </div> 
      <button id='join_button' onClick={goToAuthenticate}>join</button>
    </div>
  );
}
