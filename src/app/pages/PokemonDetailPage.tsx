import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonDetail } from "@/components/pokemon/PokemonDetail";
import { usePokemonDetailPage } from "@/hooks/usePokemonDetailPage";

export function PokemonDetailPage() {
  const { navigate, pokemon, species, colors, isLoading, isError } =
    usePokemonDetailPage();

  if (isError) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-lg font-semibold text-destructive">Error al cargar el Pokémon</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Volver a la Pokédex
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] transition-colors duration-500 bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl p-4 sm:p-6 space-y-6">
        {/* Navegación Back */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 text-muted-foreground hover:text-foreground float-right"
        >
          Volver al inicio
        </Button>

        {isLoading ? (
          <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-6">
            <div className="flex flex-col gap-6 sm:flex-row">
              <Skeleton className="h-44 w-44 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-2/3" />
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ) : pokemon && species ? (
          <PokemonDetail
            pokemon={pokemon}
            species={species}
            colors={colors}
          />
        ) : null}
      </div>
    </div>
  );
}
