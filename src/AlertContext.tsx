import { createContext, useState } from "react"
import {Alert, Snackbar} from "@mui/material"

type Severity = "success" | "error" | "info"

export const AlertContext = createContext({
  update: (value: {severity: Severity, message: string}) => {},
})

export const AlertContextProvider = (props: any) => {
  const [value, setValue] = useState<{severity: Severity, message: string}|null>(null)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

  const update = (value: {severity: Severity, message: string}) => {
    setIsSnackBarOpen(true)
    setValue(value)
  }
  return <AlertContext.Provider value={{update}}>
    {props.children}
    <Snackbar open={isSnackBarOpen} autoHideDuration={5000} onClose={()=>setIsSnackBarOpen(false)}>
      {value !== null? <Alert severity={value.severity} onClose={()=>setIsSnackBarOpen(false)}>{value.message}</Alert>: <p />}
    </Snackbar>
  </AlertContext.Provider>
}