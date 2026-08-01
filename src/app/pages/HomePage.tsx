import { FilterBar } from "@/components/filters/FilterBar";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { Button } from "@/components/ui/button";
import { useHomePage } from "@/hooks/useHomePage";

export function HomePage() {
  const {
    filters,
    total,
    currentPage,
    totalPages,
    canGoPrev,
    canGoNext,
    nextPage,
    prevPage,
    activeList,
    activeLoading,
    activeError,
    handleFiltersChange,
    handleModeChange,
  } = useHomePage();

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Pokédex
        </h1>
        <p className="text-muted-foreground mt-1">
          Encuentra tu Pokémon favorito usando búsqueda avanzada.
        </p>
      </div>

      {/* Barra de Filtros */}
      <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <FilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onModeChange={handleModeChange}
        />
      </section>

      {/* Cuadrícula de Pokémon */}
      <section className="min-h-100">
        <PokemonGrid
          pokemonList={activeList}
          isLoading={activeLoading}
          isError={activeError}
        />
      </section>

      {/* Paginación global para cualquier modo */}
      {!activeError && total > 0 && (
        <div className="flex items-center justify-between border-t border-border pt-6 pb-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={!canGoPrev || activeLoading}
          >
            &larr; Anterior
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            Página {currentPage} de {totalPages}
            <span className="ml-1 hidden text-muted-foreground/60 sm:inline-block">({total} Pokémon)</span>
          </span>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={!canGoNext || activeLoading}
          >
            Siguiente &rarr;
          </Button>
        </div>
      )}
    </div>
  );
}
