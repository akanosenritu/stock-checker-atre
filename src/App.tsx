import { useState, useEffect} from "react"
import './App.css'
import Main from "./Main"
import { AccountInfo, AccountInfoContext } from "./accountInfo/AccountInfo"
import AccountInfoDialog from "./AccountInfoDialog"
import { AlertContextProvider } from "./AlertContext"
import { ProductsInfoContext, ProductsInfo } from "./productInfo/productInfo"

const App = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo|null>(null)
  const [productsInfo, setProductsInfo] = useState<ProductsInfo|null>(null)
  
  return <AccountInfoContext.Provider value={accountInfo}>
    <AlertContextProvider>
      <ProductsInfoContext.Provider value={productsInfo}>
        <Main />
      </ProductsInfoContext.Provider>
      <AccountInfoDialog isOpen={false} onConfirmed={accountInfo => setAccountInfo(accountInfo)}/>
    </AlertContextProvider>
  </AccountInfoContext.Provider>
}

export default App
