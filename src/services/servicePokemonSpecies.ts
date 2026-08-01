import { Api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { PokemonSpecies } from "@/type/Species";

export const getPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
  const { data } = await Api.get<PokemonSpecies>(`/pokemon-species/${id}`);
  return data;
};

export const useGetPokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: ["pokemon-species-detail", id],
    queryFn: () => getPokemonSpecies(id),
    enabled: id > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};