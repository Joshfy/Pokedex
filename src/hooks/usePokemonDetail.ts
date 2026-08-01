import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { getContrastColor, getReadableTextColor } from "@/utils/colorUtils";
import { useGetEvolutionChain } from "@/services/serviceEvolution";
import { flattenChain } from "@/components/pokemon/EvolutionChain";
import type { PokemonDetail } from "@/type/Pokemon";
import type { PokemonSpecies } from "@/type/Species";
import type { PokemonColors } from "@/type/Color";

function getEvolutionChainId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
}

function findSpanishText<T extends { language: { name: string } }>(
  entries: T[],
  getValue: (entry: T) => string
): string {
  const entry =
    entries.find((e) => e.language.name === "es-419") ??
    entries.find((e) => e.language.name === "en");
  return entry ? getValue(entry) : "";
}

export function usePokemonDetail(
  pokemon: PokemonDetail,
  species: PokemonSpecies,
  colors?: PokemonColors
)
 {
  useTheme();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const [evolvingTo, setEvolvingTo] = useState<{ id: number; name: string } | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Resetear animación cuando cambia el Pokémon
  useEffect(() => {
    setIsFadingOut(false);
    setEvolvingTo(null);
  }, [pokemon.id]);

  // Paleta de colores
  const palette = colors?.colorPalette;
  const primary = palette?.primary ?? "#6366f1";
  const secondary = palette?.secondary ?? "#818cf8";
  const accent = palette?.accent ?? "#4f46e5";

  // Textos localizados
  const cryUrl = pokemon.cries?.latest ?? pokemon.cries?.legacy ?? "";
  const genus = findSpanishText(species.genera, (g) => g.genus);
  const description = findSpanishText(
    species.flavor_text_entries,
    (e) => e.flavor_text.replace(/[\r\n\f]/g, " ")
  );

  // Cadena evolutiva
  const evolutionChainId = species.evolution_chain?.url
    ? getEvolutionChainId(species.evolution_chain.url)
    : 0;

  const { data: evolutionData } = useGetEvolutionChain(evolutionChainId);

  const nextEvolution = (() => {
    if (!evolutionData?.chain) return null;
    const steps = flattenChain(evolutionData.chain);
    const currentIndex = steps.findIndex((s) => s.id === pokemon.id);
    if (currentIndex !== -1 && currentIndex + 1 < steps.length) {
      return steps[currentIndex + 1];
    }
    return null;
  })();

  // Imagen principal
  const officialArtwork =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    "";

  // Handlers
  const handlePlayCry = () => {
    if (!cryUrl) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(cryUrl);
    audioRef.current.play();
  };

  const handleStartEvolve = (step: { id: number; name: string }) => {
    setEvolvingTo({ id: step.id, name: step.name });
  };

  const handleEvolutionComplete = () => {
    if (evolvingTo) {
      const targetId = evolvingTo.id;
      setIsFadingOut(false);
      setEvolvingTo(null);
      navigate(`/pokemon/${targetId}`);
    }
  };

  // Colores de contraste listos para usar en JSX
  const colors_ = {
    primary,
    secondary,
    accent,
    primaryText: getReadableTextColor(primary),
    primaryContrast: getContrastColor(primary),
    secondaryContrast: getContrastColor(secondary),
    accentContrast: getContrastColor(accent),
  };

  return {
    colors: colors_,
    evolvingTo,
    isFadingOut,
    setIsFadingOut,
    genus,
    description,
    cryUrl,
    evolutionChainId,
    evolutionData,
    nextEvolution,
    officialArtwork,
    navigate,
    handlePlayCry,
    handleStartEvolve,
    handleEvolutionComplete,
  };
}
