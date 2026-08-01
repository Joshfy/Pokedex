import { useEffect } from "react";
import { useHomeStore } from "@/store/useHomeStore";
import { useGetPokemonPage } from "@/services/servicePokemon";
import { useGetPokemonSearch } from "@/services/serviceSearch";
import { useGetLegendaries } from "@/services/serviceLegendary";
import type { FilterState } from "@/type/Filters";
import type { PokemonListItem } from "@/type/Pokemon";

export function useHomePage() {
  const {
    filters,
    setFilters,
    setMode,
    offset,
    limit,
    total,
    setTotal,
    nextPage,
    prevPage,
    resetPagination,
    setScrollPosition,
  } = useHomeStore();

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canGoPrev = offset > 0;
  const canGoNext = offset + limit < total;

  // 1. Paginación REST
  const pageResult = useGetPokemonPage(limit, offset, filters.mode === "paginated");

  // 2. Filtros GraphQL
  const searchResult = useGetPokemonSearch(
    {
      search: filters.search,
      type: filters.type,
      generation: filters.generation,
    },
    limit,
    offset,
    filters.mode === "filter"
  );

  // 3. Legendarios GraphQL
  const legendaryResult = useGetLegendaries(
    limit,
    offset,
    filters.mode === "legendary"
  );

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(newFilters);
    resetPagination();
  };

  const handleModeChange = (newMode: FilterState["mode"]) => {
    setMode(newMode);
    resetPagination();
  };

  // Determinar qué datos mostrar según el modo activo
  let activeList: PokemonListItem[] = [];
  let activeLoading = false;
  let activeError = false;
  let activeTotal = 0;

  if (filters.mode === "paginated") {
    activeList =
      pageResult.data?.results.map((item) => {
        const parts = item.url.split("/").filter(Boolean);
        const id = parseInt(parts[parts.length - 1]);
        return { id, name: item.name };
      }) ?? [];
    activeTotal = pageResult.data?.count ?? 0;
    activeLoading = pageResult.isLoading;
    activeError = pageResult.isError;
  } else if (filters.mode === "filter") {
    activeList = searchResult.data?.results ?? [];
    activeTotal = searchResult.data?.count ?? 0;
    activeLoading = searchResult.isLoading;
    activeError = searchResult.isError;
  } else if (filters.mode === "legendary") {
    activeList = legendaryResult.data?.results ?? [];
    activeTotal = legendaryResult.data?.count ?? 0;
    activeLoading = legendaryResult.isLoading;
    activeError = legendaryResult.isError;
  }

  // Sincronizar el total en la paginación global si cambia
  useEffect(() => {
    if (activeTotal !== total) {
      setTotal(activeTotal);
    }
  }, [activeTotal, total, setTotal]);

  // Restaurar posición de scroll cuando termina la carga
  useEffect(() => {
    if (!activeLoading) {
      const timeout = setTimeout(() => {
        const savedScroll = useHomeStore.getState().scrollPosition;
        if (savedScroll > 0) {
          window.scrollTo(0, savedScroll);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [activeLoading]);

  // Guardar posición de scroll en tiempo real (debounced)
  useEffect(() => {
    let timeoutId: number;
    const scrollListener = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setScrollPosition(window.scrollY);
      }, 150);
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
      clearTimeout(timeoutId);
      setScrollPosition(window.scrollY);
    };
  }, [setScrollPosition]);

  return {
    filters,
    offset,
    limit,
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
  };
}
