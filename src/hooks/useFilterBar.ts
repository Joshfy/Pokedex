import { useEffect, useRef } from "react";
import { useGetFilters } from "@/services/serviceFilters";
import type { FilterState, ViewMode } from "@/type/Filters";

const MODE_LABELS: Record<ViewMode, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  paginated: { label: "REST: Paginado", variant: "default" },
  filter: { label: "GraphQL: Filtro", variant: "secondary" },
  legendary: { label: "GraphQL: Legendarios", variant: "default" },
};

interface UseFilterBarOptions {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onModeChange: (mode: ViewMode) => void;
}

export function useFilterBar({ filters, onFiltersChange, onModeChange }: UseFilterBarOptions) {
  const { data: filtersData, isLoading: isLoadingFilters } = useGetFilters();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const types = filtersData?.pokemon_v2_type?.filter(
    (t: { name: string }) => t.name !== "unknown" && t.name !== "shadow"
  ) ?? [];
  const generations = filtersData?.pokemon_v2_generation ?? [];

  const hasActiveFilters = !!(filters.search || filters.type || filters.generation);

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFiltersChange({ search: value });
      if (value) onModeChange("filter");
    }, 300);
  };

  const handleSelectChange = (key: keyof FilterState, value: string) => {
    const normalizedValue = value === "all" ? "" : value;
    onFiltersChange({ [key]: normalizedValue });
    if (normalizedValue) onModeChange("filter");
  };

  const handleSwitchToAll = () => {
    onFiltersChange({ search: "", type: "", generation: "" });
    onModeChange("paginated");
  };

  const handleSwitchToLegendary = () => {
    onFiltersChange({ search: "", type: "", generation: "" });
    onModeChange("legendary");
  };

  // Cleanup del debounce al desmontar
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const modeInfo = MODE_LABELS[filters.mode];

  return {
    types,
    generations,
    isLoadingFilters,
    hasActiveFilters,
    modeInfo,
    handleSearchChange,
    handleSelectChange,
    handleSwitchToAll,
    handleSwitchToLegendary,
  };
}
