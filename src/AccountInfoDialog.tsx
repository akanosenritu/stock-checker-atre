import { useContext, useEffect, useState } from "react"
import { Box, Button, Dialog, TextField, Typography } from "@mui/material"
import { AccountInfo } from "./accountInfo/AccountInfo"
import { getProductsInfo } from "./api/api"
import { AlertContext } from "./AlertContext"
import Cookie from "js-cookie"

type Props = {
  isOpen: boolean,
  onConfirmed: (accountInfo: AccountInfo) => void,
}

const AccountInfoDialog = (props: Props) => {
  const [contractId, setContractId] = useState<string>("")
  const [accessToken, setAccessToken] = useState<string>("")
  const alertContext = useContext(AlertContext)

  const loadInfoFromCookie = () => {
    const potentialContractId = Cookie.get("contractId")
    const potentialAccessToken = Cookie.get("accessToken")
    if (potentialContractId && potentialAccessToken) {
      setContractId(potentialContractId)
      setAccessToken(potentialAccessToken)
    }
  }
  useEffect(() => loadInfoFromCookie(), [])

  const saveInfoIntoCookie = (contractId: string, accessToken: string) => {
    Cookie.set("contractId", contractId)
    Cookie.set("accessToken", accessToken)
  }

  const tryAccess = async () => {
    if (!contractId || !accessToken) {
      alertContext.update({severity: "error", message: "契約Idとアクセストークンを両方入力してください"})
    }
    const result = await getProductsInfo({contractId, accessToken})
    if (result.status === "success") {
      alertContext.update({severity: "success", message: "製品情報を取得しました"})
      saveInfoIntoCookie(contractId, accessToken)
      props.onConfirmed({contractId, accessToken})
    } else {
      alertContext.update({severity: "error", message: "ログインに失敗しました。"})
    }
  }

  return <Dialog open={props.isOpen}>
    <Box sx={{
      minWidth: 300,
      padding: 1,
      "& .MuiTextField-root": {mt: 1}
    }}>
      <Typography variant="h6">アカウント情報を入力</Typography>
      <TextField 
        label="契約ID"
        value={contractId}
        onChange={e => setContractId(e.target.value)}
        size="small"
        fullWidth={true}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField 
        label="アクセストークン"
        value={accessToken}
        onChange={e => setAccessToken(e.target.value)}
        size="small"
        type="password"
        fullWidth={true}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Box sx={{mt: 1, textAlign: "center"}}>
        <Button variant="outlined" onClick={() => tryAccess()}>ログイン</Button>        
      </Box>
    </Box>
    
  </Dialog>
}

export default AccountInfoDialog