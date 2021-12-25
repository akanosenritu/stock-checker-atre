import { createContext } from "react"

export type ProductInfo = {
  productId: number,
  productName: string,
  productCode: string,
}

export type ProductsInfo = {
    total: number,
    products: ProductInfo[]
}
  
export const ProductsInfoContext = createContext<ProductsInfo|null>(null)