import { PokemonCard, PokemonCardSkeleton } from "./PokemonCard";
import type { PokemonListItem } from "@/type/Pokemon";

interface PokemonGridProps {
  pokemonList: PokemonListItem[];
  isLoading: boolean;
  isError?: boolean;
}

const SKELETON_COUNT = 20;

export function PokemonGrid({ pokemonList, isLoading, isError }: PokemonGridProps) {
  if (isError) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 text-center">
        <span className="text-4xl">⚠️</span>
        <p className="text-sm font-medium text-destructive">
          Error al cargar los Pokémon. Verifica tu conexión.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/30 text-center">
        <span className="text-5xl">🔍</span>
        <p className="text-sm font-medium text-muted-foreground">
          No se encontraron Pokémon con esos filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
