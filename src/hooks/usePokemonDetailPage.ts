import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemon } from "@/services/servicePokemon";
import { useGetPokemonSpecies } from "@/services/servicePokemonSpecies";
import { useGetPokemonShinyColor } from "@/services/serviceColorPokemon";

export function usePokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pokemonId = parseInt(id ?? "0", 10);

  // Scroll al tope cada vez que cambia el ID del Pokémon
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: pokemon, isLoading: loadingPokemon, isError: errorPokemon } =
    useGetPokemon(pokemonId);

  const { data: species, isLoading: loadingSpecies, isError: errorSpecies } =
    useGetPokemonSpecies(pokemonId);

  const { data: colors } = useGetPokemonShinyColor(pokemonId);

  const isLoading = loadingPokemon || loadingSpecies;
  const isError = errorPokemon || errorSpecies;

  return {
    pokemonId,
    navigate,
    pokemon,
    species,
    colors,
    isLoading,
    isError,
  };
}
