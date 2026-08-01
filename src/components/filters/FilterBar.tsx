import { Search, Star, List, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFilterBar } from "@/hooks/useFilterBar";
import type { FilterState, ViewMode } from "@/type/Filters";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onModeChange: (mode: ViewMode) => void;
}

export function FilterBar({ filters, onFiltersChange, onModeChange }: FilterBarProps) {
  const {
    types,
    generations,
    isLoadingFilters,
    hasActiveFilters,
    modeInfo,
    handleSearchChange,
    handleSelectChange,
    handleSwitchToAll,
    handleSwitchToLegendary,
  } = useFilterBar({ filters, onFiltersChange, onModeChange });

  return (
    <div className="space-y-4">
      {/* Fila Principal: Búsqueda y Toggles de Modo */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Barra de Búsqueda */}
        <div className="relative flex-1">
          {isLoadingFilters ? (
            <Loader2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary" />
          ) : (
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            id="search-pokemon"
            type="text"
            placeholder="Buscar Pokémon (ej: Pikachu, Charizard)..."
            defaultValue={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-14 pl-12 text-base rounded-2xl shadow-sm border-border bg-card transition-colors focus-visible:ring-primary"
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwitchToAll}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>

        {/* Toggles de Modo (Pokedex vs Legendarios) */}
        <div className="flex items-center rounded-2xl border border-border bg-muted/30 p-1.5 shadow-sm">
          <Button
            id="btn-view-all"
            variant={filters.mode === "paginated" ? "default" : "ghost"}
            onClick={handleSwitchToAll}
            className={`gap-2 rounded-xl px-5 h-11 transition-all ${
              filters.mode !== "paginated" ? "text-muted-foreground hover:text-foreground hover:bg-muted/50" : "shadow-md"
            }`}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Pokédex Completa</span>
            <span className="sm:hidden">Todos</span>
          </Button>
          <Button
            id="btn-legendary"
            variant={filters.mode === "legendary" ? "default" : "ghost"}
            onClick={handleSwitchToLegendary}
            className={`gap-2 rounded-xl px-5 h-11 transition-all ${
              filters.mode !== "legendary" ? "text-muted-foreground hover:text-foreground hover:bg-muted/50" : "shadow-md"
            }`}
          >
            <Star className={`h-4 w-4 ${filters.mode === "legendary" ? "fill-current" : ""}`} />
            Legendarios
          </Button>
        </div>
      </div>

      {/* Fila Secundaria: Filtros Avanzados (Dropdowns) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
        <Select
          value={filters.type || "all"}
          onValueChange={(v) => handleSelectChange("type", v || "all")}
          disabled={isLoadingFilters}
        >
          <SelectTrigger id="select-type" className="h-12 rounded-xl bg-card border-border shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs font-bold uppercase tracking-wider">Tipo:</span>
              <SelectValue placeholder="Cualquiera" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="font-medium">Cualquiera</SelectItem>
            {types.map((t: { name: string }) => (
              <SelectItem key={t.name} value={t.name} className="capitalize">
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.generation || "all"}
          onValueChange={(v) => handleSelectChange("generation", v || "all")}
          disabled={isLoadingFilters}
        >
          <SelectTrigger id="select-generation" className="h-12 rounded-xl bg-card border-border shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs font-bold uppercase tracking-wider">Gen:</span>
              <SelectValue placeholder="Cualquiera" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="font-medium">Cualquiera</SelectItem>
            {generations.map((g: { name: string }) => (
              <SelectItem key={g.name} value={g.name} className="capitalize">
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Motor Activo (Badge sutil) */}
      <div className="flex justify-end pt-1">
        <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground/60 border-muted bg-transparent">
          {modeInfo.label}
        </Badge>
      </div>
    </div>
  );
}
