import { useQuery } from "@tanstack/react-query";
import type { PokemonListItem } from "@/type/Pokemon";
import type { FilterState } from "@/type/Filters";
import { GraphQLApi } from "@/api/graphql";

export const getPokemonSearch = async (
  filters: Omit<FilterState, "mode">,
  limit: number,
  offset: number
): Promise<{ results: PokemonListItem[]; count: number }> => {
  const conditions: string[] = [];

  if (filters.search) conditions.push(`name: {_ilike: "%${filters.search}%"}`);
  if (filters.type) conditions.push(`pokemon_v2_pokemons:{pokemon_v2_pokemontypes:{pokemon_v2_type:{name:{_eq:"${filters.type}"}}}}`);
  if (filters.generation) conditions.push(`pokemon_v2_generation:{name:{_eq:"${filters.generation}"}}`);

  const where = conditions.length > 0 ? `where:{${conditions.join(",")}}` : "";

  const query = `
    query SearchPokemon {
      pokemon_v2_pokemonspecies(
        ${where}
        order_by:{id:asc}
        limit:${limit}
        offset:${offset}
      ){
        id
        name
      }
      pokemon_v2_pokemonspecies_aggregate(
        ${where}
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  const data = await GraphQLApi(query);
  return {
    results: data.pokemon_v2_pokemonspecies as PokemonListItem[],
    count: data.pokemon_v2_pokemonspecies_aggregate.aggregate.count as number
  };
};

export const useGetPokemonSearch = (
  filters: Omit<FilterState, "mode">,
  limit: number,
  offset: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["pokemon-search", filters, limit, offset],
    queryFn: () => getPokemonSearch(filters, limit, offset),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};