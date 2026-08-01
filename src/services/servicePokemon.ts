import { Api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { PokemonDetail, PokemonListResponse } from "@/type/Pokemon";

// ─── REST: detalle completo de un Pokémon ───────────────────

export const getPokemon = async (id: number): Promise<PokemonDetail> => {
  const { data } = await Api.get<PokemonDetail>(`/pokemon/${id}`);
  return data;
};

export const useGetPokemon = (id: number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(id),
    enabled: id > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// ─── REST: lista paginada de species ────────────────────────

export const getPokemonPage = async (
  limit: number,
  offset: number
): Promise<PokemonListResponse> => {
  const { data } = await Api.get<PokemonListResponse>("/pokemon-species", {
    params: { limit, offset },
  });
  return data;
};

export const useGetPokemonPage = (limit: number, offset: number, enabled = true) => {
  return useQuery({
    queryKey: ["pokemon-page", limit, offset],
    queryFn: () => getPokemonPage(limit, offset),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};