import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);

  const countHandler = (type) => {
    if (type === "incr") setCounter(counter + 1)
    else if (type === "decr") setCounter(counter > 0 ? counter - 1 : 0)
    else counter !== 0 ? setCounter(0) : alert("Counter already at 0")
  }
  return (
    <>
      <div>
        <h1>Counter</h1>
        <h1>{counter}</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => countHandler("incr")}>+</button>
          <button onClick={() => countHandler("decr")}>-</button>
          <button onClick={() => countHandler("reset")}>RESET</button>
        </div>
      </div>
    </>
  )
}

export default App
