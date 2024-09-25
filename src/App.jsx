import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const LIGHTS_DATA = {
  red: {
    secs: 10,
    next: "green",

  },
  yellow: {
    secs: 5,
    next: "red",

  },
  green: {
    secs: 15,
    next: "yellow",

  }
};



function App() {
  const [status, setStatus] = useState({
    color: "green",
    secs: 15,
  });

  const [inputVal, setInputVal] = useState(0);
  const [lightChangerVal, setLightChangerVal] = useState("none");

  useEffect(()=>{
    let intervalId = setInterval(()=>{
      setStatus(status => {
        if(status.secs > 0){
          return {
            ...status,
            "secs": status.secs - 1,
          };
        }
        else{
          return {
            "color" : LIGHTS_DATA[status.color].next,
            "secs" : LIGHTS_DATA[LIGHTS_DATA[status.color].next].secs,
          };
        }
      });

    }, 1000);


    return () => {
      clearInterval(intervalId);
    }

  }, []);

  const addSecsHandler = () => {
    setStatus(status => {
      return {
        ...status,
        "secs" : status.secs + inputVal,
      }
    })
  }

  const changeLightHandler = () => {
    setStatus({
      "color" : lightChangerVal,
      "secs" : LIGHTS_DATA[lightChangerVal].secs,
    });
  }

  return (
    <>
      <div className='mb-5 p-5 border-[1px] border-white rounded-md w-[100px] flex flex-col justify-center items-center'>
        <div className={`w-[50px] h-[50px] mb-5 rounded-3xl ${status.color === "red" ? "bg-red-600" : "bg-red-600 opacity-20"}`}></div>
        <div className={`w-[50px] h-[50px] mb-5 rounded-3xl ${status.color === "yellow" ? "bg-yellow-600" : "bg-yellow-600 opacity-20"}`}></div>
        <div className={`w-[50px] h-[50px] mb-5 rounded-3xl ${status.color === "green" ? "bg-green-600" : "bg-green-600 opacity-20"}`}></div>
      </div>

      <div className='mb-5'>
        <div>Current light: {status.color.toUpperCase()}</div>
        <div>Timer : {status.secs} secs</div>
      </div>

      <div className='mb-5'>
        <input type='number' value={inputVal} onChange={(e)=> {setInputVal(+e.target.value)}} />
        <button onClick={addSecsHandler}>Add secs</button>
      </div>

      <div className='mb-5'>
        <select onChange={(e) => {setLightChangerVal(e.target.value)}} value={lightChangerVal}>
          <option value={"none"} disabled>Select light</option>
          <option value={"green"}>Green</option>
          <option value={"yellow"}>Yellow</option>
          <option value={"red"}>Red</option>
        </select>
        <button onClick={changeLightHandler}>Change Light</button>
      </div>
    </>
  )
}

export default App

/*

  automatically chaning lights
    - countdown timer

    {
      red: {
        secs: 10,
        next: "green",

      },
      yellow: {
        secs: 5,
        next: "red",

      },
      green: {
        secs: 15,
        next: "yellow",

      }
    }

    useEffect
      if timer--;
      else set new values;

  add custom seconds in on-going timer
    just simply increase timer value on click, simple

  switch lights at any moment
    trigger change light for here, simple

*/