import { AccountInfo } from "../accountInfo/AccountInfo";
import { ProductsInfo } from "../productInfo/productInfo";
import { Failure, SuccessWithData } from "./Result";

const URL = "https://webapi.smaregi.jp/access/"

const constructHeaders = (accountInfo: AccountInfo) => {
  return {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-contract-id": accountInfo.contractId,
    "X-access-token": accountInfo.accessToken
  }
}

const constructData = (procName: string, data: any) => {
  return `proc_name=${procName}&params=${JSON.stringify(data)}`
}

export const getProductsInfo = async (accountInfo: AccountInfo): Promise<SuccessWithData<ProductsInfo>|Failure> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: constructHeaders(accountInfo),
    body: constructData("product_ref", {"table_name": "Product"})
  })
  if (!res.ok) return {status: "error"}
  const data = await res.json()
  return {
    status: "success",
    data: data as ProductsInfo
  }
}