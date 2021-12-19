import {useState, useRef} from "react"
import './App.css'
import Scanner from "./Scanner"


const App = () => {
  const [results, setResults] = useState<any[]>([]);
  const scannerRef = useRef(null);

  console.log(results)

  return <div>
    <div style={{display: "flex", justifyContent:"center"}}>
      <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
        <canvas className="drawingBuffer" style={{
            position: 'absolute',
            top: '0px',
            // left: '0px',
            // height: '100%',
            // width: '100%',
            border: '3px solid green',
        }} width="640" height="480" />
        <Scanner 
          scannerRef={scannerRef} 
          onDetected={(result) => setResults([...results, result])} 
        /> 
      </div>
    </div>
    <p>
      lorem ipsum
    </p>
</div>
}

export default App;
