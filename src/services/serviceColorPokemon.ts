import { Apicolor } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type  { PokemonColors } from "@/type/Color";

export const getPokemonColors = async (
  id: number
): Promise<PokemonColors> => {
  const { data } = await Apicolor.get(`/data/pokemon/${id}.json`);

  return {
    colorPalette: data.colorPalette,
    shinyColorPalette: data.shinyColorPalette,
  };
};


export const useGetPokemonShinyColor = (id: number) => {
  return useQuery({
    queryKey: ["pokemon-shiny-color", id],
    queryFn: () => getPokemonColors(id),
    enabled: id > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};