import { useQuery } from "@tanstack/react-query"
import { GraphQLApi } from "@/api/graphql"
import type { PokemonListItem } from "@/type/Pokemon";

export const getLegendaries = async (limit: number, offset: number): Promise<{ results: PokemonListItem[]; count: number }> => {
  const query = `
  query GetLegendaries {
    pokemon_v2_pokemonspecies(
      where:{ is_legendary:{_eq:true} }
      order_by:{ id:asc }
      limit:${limit}
      offset:${offset}
    ){
      id
      name
    }
    pokemon_v2_pokemonspecies_aggregate(where:{ is_legendary:{_eq:true} }) {
      aggregate {
        count
      }
    }
  }
  `
  const data = await GraphQLApi(query)
  return {
    results: data.pokemon_v2_pokemonspecies as PokemonListItem[],
    count: data.pokemon_v2_pokemonspecies_aggregate.aggregate.count as number
  };
}

export const useGetLegendaries = (limit: number, offset: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["legendaries", limit, offset],
    queryFn: () => getLegendaries(limit, offset),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}