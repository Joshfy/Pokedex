import { motion } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Activity, Dna, Shield, Star, Baby, TrendingUp, Globe, Heart, Egg, Users, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonStats } from "./PokemonStats";
import { EvolutionChain } from "./EvolutionChain";
import { EvolutionAnimation } from "./EvolutionAnimation";
import { useGetAbility } from "@/services/serviceAbility";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import type { PokemonDetail as TPokemonDetail } from "@/type/Pokemon";
import type { PokemonSpecies } from "@/type/Species";
import type { PokemonColors } from "@/type/Color";

interface PokemonDetailProps {
  pokemon: TPokemonDetail;
  species: PokemonSpecies;
  colors?: PokemonColors;
}

function AbilityItem({ url, isHidden, accentColor }: { url: string; isHidden: boolean; accentColor: string }) {
  const { data: ability, isLoading } = useGetAbility(url);

  if (isLoading) {
    return <Skeleton className="h-16 w-full rounded-xl" />;
  }
  if (!ability) return null;

  return (
    <div
      className="flex flex-col gap-2 rounded-2xl border p-4 shadow-sm transition-colors hover:bg-muted/30"
      style={{ borderColor: `${accentColor}30` }}
    >
      <div className="flex items-center gap-2">
        <h4 className="font-bold capitalize text-sm">{ability.name}</h4>
        {isHidden && (
          <Badge variant="outline" className="text-[9px] uppercase h-5 px-1.5 font-bold" style={{ color: accentColor, borderColor: accentColor }}>
            Habilidad Oculta
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {ability.description || ability.effectShort || "Sin descripción disponible."}
      </p>
    </div>
  );
}

export function PokemonDetail({ pokemon, species, colors }: PokemonDetailProps) {
  const {
    colors: c,
    evolvingTo,
    isFadingOut,
    setIsFadingOut,
    genus,
    description,
    cryUrl,
    evolutionChainId,
    nextEvolution,
    officialArtwork,
    handlePlayCry,
    handleStartEvolve,
    handleEvolutionComplete,
  } = usePokemonDetail(pokemon, species, colors);

  return (
    <div className="space-y-8 pb-10">
      {/* ── 1. Hero: Tarjeta Principal ─────────────────── */}
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        
        {/* Izquierda: Info y Sprite pequeño (opcional) o Título */}
        <motion.div
          key={`left-${pokemon.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFadingOut ? 0 : 1,
            y: isFadingOut ? -10 : 0,
            filter: isFadingOut ? "blur(8px)" : "blur(0px)"
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-1 flex-col justify-center gap-5"
        >
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase opacity-70">
              {genus}
            </p>
            <h2
              className="mt-1 text-5xl font-black capitalize tracking-tight drop-shadow-sm"
              style={{ color: c.primaryText }}
            >
              {pokemon.name}
            </h2>
            <p className="font-mono text-xl font-bold opacity-50 mt-1">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {pokemon.types.map(({ type }) => (
              <Badge
                key={type.name}
                className="px-4 py-1.5 text-sm uppercase tracking-wider shadow-sm border-none"
                style={{ backgroundColor: c.secondary, color: c.secondaryContrast }}
              >
                {type.name}
              </Badge>
            ))}
            {species.is_legendary && (
              <Badge className="gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${c.accent}CC`, color: c.accentContrast }}>
                <Star className="h-3 w-3" /> Legendario
              </Badge>
            )}
            {species.is_mythical && (
              <Badge className="gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "#a855f7CC", color: "#fff" }}>
                <Sparkles className="h-3 w-3" /> Mítico
              </Badge>
            )}
            {species.is_baby && (
              <Badge className="gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "#f472b6CC", color: "#fff" }}>
                <Baby className="h-3 w-3" /> Bebé
              </Badge>
            )}
          </div>

          {description && (
            <p className="text-lg leading-relaxed opacity-90 max-w-lg">
              {description}
            </p>
          )}

          <div className="mt-4 flex gap-4">
            {cryUrl ? (
              <Button
                id="btn-play-cry"
                size="lg"
                onClick={handlePlayCry}
                className="gap-2 rounded-xl px-8 font-bold shadow-lg transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: c.primary,
                  color: c.primaryContrast,
                }}
              >
                <Volume2 className="h-5 w-5" />
                Reproducir Grito
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 text-sm opacity-70">
                <VolumeX className="h-4 w-4" />
                Sin grito disponible
              </div>
            )}
          </div>

          {/* Habilidades */}
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-70">
              <Sparkles className="h-4 w-4" style={{ color: c.primaryText }} /> Habilidades
            </p>
            <div className="flex flex-col gap-3">
              {pokemon.abilities.map((ability) => (
                <AbilityItem
                  key={ability.ability.name}
                  url={ability.ability.url}
                  isHidden={ability.is_hidden}
                  accentColor={c.primaryText}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Derecha: Sprite Gigante o Animación */}
        <div className="flex-1 flex flex-col justify-center items-center relative min-h-100">
          {evolvingTo ? (
            <EvolutionAnimation
              currentId={pokemon.id}
              currentName={pokemon.name}
              nextId={evolvingTo.id}
              nextName={evolvingTo.name}
              primaryColor={c.primary}
              onEvolvedRevealed={() => setIsFadingOut(true)}
              onComplete={handleEvolutionComplete}
            />
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="relative flex justify-center items-center h-72 w-72 md:h-96 md:w-96">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-60"
                  style={{ backgroundColor: c.primary, transform: "scale(0.8)" }}
                />
                <img
                  src={officialArtwork}
                  alt={pokemon.name}
                  className="relative z-10 h-72 w-72 object-contain drop-shadow-2xl md:h-96 md:w-96 transition-transform hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                  }}
                />
              </div>

              {/* Botón de Evolución */}
              {nextEvolution && (
                <Button
                  size="lg"
                  onClick={() => handleStartEvolve(nextEvolution)}
                  className="mt-8 gap-2 rounded-xl px-10 py-6 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1"
                  style={{
                    backgroundColor: c.primary,
                    color: c.primaryContrast,
                  }}
                >
                  <Sparkles className="h-6 w-6" />
                  Evolucionar a {nextEvolution.name}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <motion.div
        key={`bottom-${pokemon.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: isFadingOut ? 0 : 1,
          y: isFadingOut ? -15 : 0,
          filter: isFadingOut ? "blur(8px)" : "blur(0px)"
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="space-y-8"
      >
        <Separator className="my-8" style={{ backgroundColor: `${c.primary}30` }} />

        <Separator className="my-8" style={{ backgroundColor: `${c.secondary}30` }} />

        {/* ── 3. Biología ──────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-6 w-6" style={{ color: c.primaryText }} />
            <h3 className="text-xl font-bold tracking-tight">Biología</h3>
          </div>
          {/* Fila 1: medidas + hábitat + color */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.primary}40`, backgroundColor: `${c.primary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Altura</p>
              <p className="mt-2 text-xl font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.secondary}40`, backgroundColor: `${c.secondary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Peso</p>
              <p className="mt-2 text-xl font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.accent}40`, backgroundColor: `${c.accent}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Hábitat</p>
              <p className="mt-2 font-bold capitalize text-lg">{species.habitat?.name ?? "—"}</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.primary}40`, backgroundColor: `${c.primary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Color</p>
              <p className="mt-2 font-bold capitalize text-lg">{species.color?.name ?? "—"}</p>
            </div>
          </div>
          {/* Fila 2: generación + género + huevos + ciclo de eclosión */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.secondary}40`, backgroundColor: `${c.secondary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Globe className="h-3 w-3" /> Generación
              </p>
              <p className="mt-2 font-bold capitalize text-base">
                {species.generation?.name?.replace("generation-", "Gen ").toUpperCase() ?? "—"}
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.accent}40`, backgroundColor: `${c.accent}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Users className="h-3 w-3" /> Género
              </p>
              <p className="mt-2 font-bold text-base">
                {species.gender_rate === -1
                  ? "Sin género"
                  : `♀ ${((species.gender_rate / 8) * 100).toFixed(0)}% · ♂ ${(((8 - species.gender_rate) / 8) * 100).toFixed(0)}%`}
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm col-span-1" style={{ borderColor: `${c.primary}40`, backgroundColor: `${c.primary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Egg className="h-3 w-3" /> Grupos de Huevo
              </p>
              <p className="mt-2 font-bold capitalize text-base">
                {species.egg_groups.length > 0
                  ? species.egg_groups.map((g) => g.name).join(" · ")
                  : "—"}
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.secondary}40`, backgroundColor: `${c.secondary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <RefreshCw className="h-3 w-3" /> Ciclo de Huevo
              </p>
              <p className="mt-2 font-bold text-base">{species.hatch_counter ?? "—"} ciclos</p>
            </div>
          </div>
          {/* Fila 3: diferencias de género + formas */}
          {(species.has_gender_differences || species.forms_switchable) && (
            <div className="flex flex-wrap gap-3">
              {species.has_gender_differences && (
                <Badge variant="outline" className="gap-1 px-3 py-2 text-xs font-semibold" style={{ borderColor: `${c.accent}60`, color: c.primaryText }}>
                  <Users className="h-3 w-3" /> Diferencias de género visibles
                </Badge>
              )}
              {species.forms_switchable && (
                <Badge variant="outline" className="gap-1 px-3 py-2 text-xs font-semibold" style={{ borderColor: `${c.secondary}60`, color: c.primaryText }}>
                  <RefreshCw className="h-3 w-3" /> Formas intercambiables
                </Badge>
              )}
            </div>
          )}
        </section>

        <Separator className="my-8" style={{ backgroundColor: `${c.primary}30` }} />

        {/* ── 4. Entrenamiento ──────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6" style={{ color: c.primaryText }} />
            <h3 className="text-xl font-bold tracking-tight">Entrenamiento</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.primary}40`, backgroundColor: `${c.primary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Star className="h-3 w-3" /> Exp. Base
              </p>
              <p className="mt-2 text-xl font-bold">{pokemon.base_experience ?? "—"}</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.secondary}40`, backgroundColor: `${c.secondary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" /> Tasa de Captura
              </p>
              <p className="mt-2 text-xl font-bold">{species.capture_rate}</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.accent}40`, backgroundColor: `${c.accent}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <Heart className="h-3 w-3" /> Felicidad Base
              </p>
              <p className="mt-2 text-xl font-bold">{species.base_happiness ?? "—"}</p>
            </div>
            <div className="rounded-2xl border p-5 text-center backdrop-blur-sm" style={{ borderColor: `${c.primary}40`, backgroundColor: `${c.primary}10` }}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" /> Crecimiento
              </p>
              <p className="mt-2 font-bold capitalize text-base">
                {species.growth_rate?.name?.replace(/-/g, " ") ?? "—"}
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-8" style={{ backgroundColor: `${c.primary}30` }} />

        {/* ── 5. Estadísticas Base ──────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-6 w-6" style={{ color: c.primaryText }} />
            <h3 className="text-xl font-bold tracking-tight">
              Estadísticas Base
            </h3>
          </div>
          <div className="rounded-3xl border p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: `${c.secondary}30`, backgroundColor: `${c.secondary}10` }}>
            <PokemonStats stats={pokemon.stats} accentColor={c.primary} />
          </div>
        </section>

        <Separator className="my-8" style={{ backgroundColor: `${c.secondary}30` }} />

        {/* ── 6. Cadena Evolutiva ───────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Dna className="h-6 w-6" style={{ color: c.primaryText }} />
            <h3 className="text-xl font-bold tracking-tight">
              Cadena Evolutiva
            </h3>
          </div>

          <div className="rounded-3xl border p-6 shadow-sm overflow-x-auto backdrop-blur-sm" style={{ borderColor: `${c.primary}30`, backgroundColor: `${c.primary}10` }}>
            {evolutionChainId > 0 ? (
              <EvolutionChain
                evolutionChainId={evolutionChainId}
                currentPokemonId={pokemon.id}
                primaryColor={c.primary}
                onEvolve={(step) => handleStartEvolve(step)}
              />
            ) : (
              <p className="text-center text-sm font-medium py-4 opacity-70">
                Este Pokémon no tiene familia evolutiva conocida.
              </p>
            )}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
