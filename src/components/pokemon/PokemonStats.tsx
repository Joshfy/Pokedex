import type { PokemonStat } from "@/type/Pokemon";

interface PokemonStatsProps {
  stats: PokemonStat[];
  accentColor?: string;
}

const STAT_DISPLAY: Record<string, { label: string; max: number }> = {
  hp:               { label: "HP",         max: 255 },
  attack:           { label: "ATK",        max: 190 },
  defense:          { label: "DEF",        max: 250 },
  "special-attack": { label: "SP.ATK",     max: 194 },
  "special-defense":{ label: "SP.DEF",     max: 250 },
  speed:            { label: "SPD",        max: 200 },
};

function getStatColor(value: number): string {
  if (value >= 120) return "#22c55e";
  if (value >= 80)  return "#84cc16";
  if (value >= 50)  return "#f59e0b";
  return "#ef4444";
}

export function PokemonStats({ stats, accentColor }: PokemonStatsProps) {
  return (
    <div className="space-y-2.5">
      {stats.map((stat) => {
        const display = STAT_DISPLAY[stat.stat.name] ?? {
          label: stat.stat.name.toUpperCase(),
          max: 255,
        };
        const percentage = Math.min(100, (stat.base_stat / display.max) * 100);
        const barColor = accentColor ?? getStatColor(stat.base_stat);

        return (
          <div key={stat.stat.name} className="grid grid-cols-[4rem_2.5rem_1fr] items-center gap-3 ">
            <span className="text-right text-xs font-semibold text-muted-foreground">
              {display.label}
            </span>
            <span className="text-right text-sm font-bold tabular-nums text-foreground bor">
              {stat.base_stat}
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-700 border-black"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: barColor,
                  border: "1px solid black",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
