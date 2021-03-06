import {useState,useRef, ChangeEvent} from "react"
import './App.css'
import Scanner from "./Scanner"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { TextField } from "@mui/material"
import ShowSearchResult from "./ShowSearchResult"

const Main = () => {
    const [scanning, setScanning] = useState(false)
    const scannerRef = useRef(null)
    

    const [searchBy, setSearchBy] = useState<{janCode?: string, itemName?: string}>({})
    const handleJanCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchBy(searchBy => ({
        ...searchBy,
        janCode: event.target.value
      }))
    }
    const handleItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchBy(searchBy => ({
        ...searchBy,
        itemName: event.target.value
      }))
    }

    const onDetected = (result: string) => {
      setSearchBy(searchBy => ({...searchBy, janCode: result}))
    }
  
    return <div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: 300, height: 300}}>
          <div ref={scannerRef} style={{position: 'relative'}}>
            <canvas className="drawingBuffer" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                // height: '100%',
                width: '100%',
                // border: '3px solid green',
            }} width={300} height={300} />
            {scanning && <Scanner 
              scannerRef={scannerRef} 
              onDetected={onDetected} 
            />}
          </div>
        </div>
      </div>
      <Box sx={{
        display: "flex",
        justifyContent: "center"
      }}> 
        <Button onClick={()=>setScanning(true)} disabled={scanning}>バーコードをスキャンする</Button>
      </Box>
      <hr />
      <Box sx={{
        mx: 3,
        '& .MuiTextField-root': { mt: 1},
      }}>
        <TextField
          fullWidth={true}
          label={"JANコード"}
          value={searchBy.janCode}
          onChange={handleJanCodeChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          fullWidth={true}
          label={"商品名"}
          value={searchBy.itemName}
          onChange={handleItemNameChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: 1,
      }}>
        <Button color="primary" variant="outlined">検索</Button>
        <Button color="secondary" variant="outlined">クリア</Button>
      </Box>
      <hr />
      <ShowSearchResult searchBy={{}}/>
    </div>
}

export default Main