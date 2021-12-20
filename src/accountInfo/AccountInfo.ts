import { createContext } from "react"

export type AccountInfo = {
  contractId: string,
  accessToken: string,
}
  
export const AccountInfoContext = createContext<AccountInfo|null>(null)