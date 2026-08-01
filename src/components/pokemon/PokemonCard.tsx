import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPokemonShinyColor } from "@/services/serviceColorPokemon";
import { useTheme } from "@/components/theme-provider";
import { getReadableTextColor } from "@/utils/colorUtils";
import type { PokemonListItem } from "@/type/Pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

/** Skeleton placeholder mientras carga */
export function PokemonCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <Skeleton className="mx-auto h-24 w-24 rounded-full" />
      <Skeleton className="mx-auto h-3 w-20 rounded" />
      <Skeleton className="mx-auto h-3 w-12 rounded" />
    </div>
  );
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  useTheme(); // Force re-render on theme change
  const navigate = useNavigate();
  const { data: colorData } = useGetPokemonShinyColor(pokemon.id);

  const palette = colorData?.colorPalette;
  const primary = palette?.primary ?? "#6366f1";
  const secondary = palette?.secondary ?? "#818cf8";

  // Fuentes de imagen: official-artwork 2D original de PokeAPI
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const shinyOfficialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;
  const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <Card
      id={`pokemon-card-${pokemon.id}`}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/pokemon/${pokemon.id}`)}
      className="group relative cursor-pointer overflow-hidden border-2 bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        borderColor: `${primary}30`,
      }}
    >
      {/* Destello decorativo en hover */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${primary}65 0%, transparent 70%)`
        }}
      />
      
      <CardContent className="relative z-10 p-5 text-center">
        {/* Contenedor del Sprite */}
        <div
          className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full shadow-inner backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
          style={{ 
            background: `radial-gradient(circle, ${primary}20 0%, transparent 70%)`,
            border: `1px solid ${secondary}20` 
          }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primary, transform: "scale(0.8)" }}
          />
          {/*
           * Imagen optimizada: official-artwork 2D (diseño original del Pokémon).
           * Hover → muestra el arte shiny; mouse leave → vuelve al normal.
           * loading="lazy" + decoding="async" + fetchPriority="low" evitan
           * bloquear el hilo principal en el grid de 20+ cartas.
           * width/height explícitos previenen CLS (Cumulative Layout Shift).
           */}
          <img
            src={officialArtworkUrl}
            onMouseEnter={(e) => { e.currentTarget.src = shinyOfficialArtworkUrl; }}
            onMouseLeave={(e) => { e.currentTarget.src = officialArtworkUrl; }}
            alt={`Sprite de ${pokemon.name}`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width={96}
            height={96}
            className="h-24 w-24 object-contain drop-shadow-xl transition-transform duration-500 group-hover:rotate-3"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackUrl) {
                target.src = fallbackUrl;
              }
            }}
          />
        </div>

        {/* ID */}
        <p className="mb-1 text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground opacity-70">
          #{String(pokemon.id).padStart(3, "0")}
        </p>

        {/* Nombre */}
        <h3 
          className="text-lg font-black capitalize tracking-tight drop-shadow-sm transition-colors duration-300"
          style={{ color: getReadableTextColor(primary) }}
        >
          {pokemon.name}
        </h3>
      </CardContent>
    </Card>
  );
}

