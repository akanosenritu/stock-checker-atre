import {useState} from "react"
import './App.css'
import Main from "./Main"
import { AccountInfo, AccountInfoContext } from "./accountInfo/AccountInfo"
import AccountInfoDialog from "./AccountInfoDialog"
import { AlertContextProvider } from "./AlertContext"

const App = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo|null>(null)
  
  return <AccountInfoContext.Provider value={accountInfo}>
    <AlertContextProvider>
      <Main />
      <AccountInfoDialog isOpen={!accountInfo} onConfirmed={accountInfo => setAccountInfo(accountInfo)}/>
    </AlertContextProvider>
  </AccountInfoContext.Provider>
}

export default App
