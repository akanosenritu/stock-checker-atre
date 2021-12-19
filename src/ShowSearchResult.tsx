import {useState} from "react"
import Box from "@mui/material/Box"

type Props = {
  searchBy: {
    janCode?: string,
    itemName?: string,
  }
}

type SearchResultItem = {
  janCode: string,
  itemName: string,
  stockCount: number,
}

type SearchResult = {
  count: number,
  items: SearchResultItem[]
}

const ShowSearchResultItem = (props: {item: SearchResultItem}) => {
  const {item} = props
  return <Box sx={{
    display: "flex",
    justifyContent: "space-between"
  }}>
    <Box>
      <Box sx={{fontSize: 8}}>{item.janCode}</Box>
      <Box>{item.itemName}</Box>
    </Box>
  </Box>
}

const ShowSearchResult = (props: Props) => {
  const [result] = useState<SearchResult>({count: 0, items: []})

  return <Box>
    {result.count > 0?
      result.items.map(item => <ShowSearchResultItem item={item}/>):
      "nothing to show"
    }
  </Box>
}

export default ShowSearchResult