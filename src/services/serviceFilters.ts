import { useQuery } from "@tanstack/react-query"
import { GraphQLApi } from "@/api/graphql"
const query = `
query GetDropdownFilters {
  pokemon_v2_type(order_by: {name: asc}) {
    name
  }


  pokemon_v2_generation(order_by: {id: asc}) {
    name
  }
}
`

export const getFilters = async () => {
  const data = await GraphQLApi(query)
  return data
}

export const useGetFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}