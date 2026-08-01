import axios from "axios"

const client = axios.create({
  baseURL: "https://beta.pokeapi.co/graphql/v1beta2",
  headers: {
    "Content-Type": "application/json",
  },
})

export const GraphQLApi = async (query: string, variables: Object = {}) => {
  const { data } = await client.post("", {
    query,
    variables,
  })

  return data.data
}