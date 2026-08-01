import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEvolutionChain } from "@/services/serviceEvolution";
import type { EvolutionChainLink, EvolutionStep } from "@/type/Evolution";

interface EvolutionChainProps {
  evolutionChainId: number;
  currentPokemonId: number;
  primaryColor?: string;
  onEvolve?: (step: EvolutionStep) => void;
}

/** Aplana recursivamente la cadena en un array lineal de pasos */
export function flattenChain(link: EvolutionChainLink): EvolutionStep[] {
  const steps: EvolutionStep[] = [];
  let current: EvolutionChainLink | undefined = link;

  while (current) {
    const parts = current.species.url.split("/").filter(Boolean);
    const id = parseInt(parts[parts.length - 1]);
    const detail = current.evolution_details[0];
    steps.push({
      id,
      name: current.species.name,
      minLevel: detail?.min_level ?? null,
      trigger: detail?.trigger?.name ?? null,
    });
    current = current.evolves_to[0];
  }
  return steps;
}

export function EvolutionChain({
  evolutionChainId,
  currentPokemonId,
  primaryColor,
  onEvolve,
}: EvolutionChainProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetEvolutionChain(evolutionChainId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-4 py-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data?.chain) {
    return (
      <p className="text-sm text-muted-foreground">Sin datos de evolución.</p>
    );
  }

  const steps = flattenChain(data.chain);
  const currentIndex = steps.findIndex((s) => s.id === currentPokemonId);

  if (steps.length <= 1) {
    return (
      <p className="text-sm text-muted-foreground">
        Este Pokémon no evoluciona.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCurrent = step.id === currentPokemonId;
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png`;
        const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${step.id}.png`;

        return (
          <div key={step.id} className="flex items-center gap-2">
            {/* Evolution step card */}
            <button
              id={`evo-step-${step.id}`}
              onClick={() => {
                if (onEvolve && currentIndex !== -1 && index > currentIndex) {
                  onEvolve(step);
                } else {
                  navigate(`/pokemon/${step.id}`);
                }
              }}
              className="group flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                borderColor: isCurrent
                  ? primaryColor ?? "#6366f1"
                  : "transparent",
                background: isCurrent ? `${primaryColor ?? "#6366f1"}15` : undefined,
              }}
            >
              <img
                src={spriteUrl}
                alt={step.name}
                className="h-16 w-16 object-contain transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallback;
                }}
              />
              <span className="text-xs font-semibold capitalize text-foreground">
                {step.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                #{String(step.id).padStart(3, "0")}
              </span>
              {step.minLevel && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Nv. {step.minLevel}
                </span>
              )}
            </button>

            {/* Arrow */}
            {!isLast && (
              <ChevronRight
                className="h-5 w-5 shrink-0 text-muted-foreground"
                style={{ color: primaryColor }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
