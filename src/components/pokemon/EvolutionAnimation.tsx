import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useTheme } from "@/components/theme-provider";
import { useQueryClient } from "@tanstack/react-query";
import { getPokemon } from "@/services/servicePokemon";
import { getPokemonSpecies } from "@/services/servicePokemonSpecies";
import { getPokemonColors } from "@/services/serviceColorPokemon";

interface EvolutionAnimationProps {
  currentId: number;
  nextId: number;
  currentName: string;
  nextName: string;
  primaryColor: string;
  onComplete: () => void;
  onEvolvedRevealed?: () => void;
}

const getSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export function EvolutionAnimation({
  currentId,
  nextId,
  currentName,
  nextName,
  primaryColor,
  onComplete,
  onEvolvedRevealed,
}: EvolutionAnimationProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";
  const silhouetteFilter = isLight
    ? "brightness(0) contrast(10) grayscale(1)"
    : isDark
      ? "brightness(10) contrast(10) grayscale(1)"
      : "brightness(0) contrast(10) grayscale(1)";

  const [phase, setPhase] = useState<"start" | "flashing" | "evolved">("start");
  const [showText, setShowText] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Pre-cargar los datos del próximo Pokémon para que al navegar el cambio sea instantáneo (sin skeleton)
    queryClient.prefetchQuery({ queryKey: ["pokemon", nextId], queryFn: () => getPokemon(nextId) });
    queryClient.prefetchQuery({ queryKey: ["pokemon-species-detail", nextId], queryFn: () => getPokemonSpecies(nextId) });
    queryClient.prefetchQuery({ queryKey: ["pokemon-shiny-color", nextId], queryFn: () => getPokemonColors(nextId) });

    // 1. Wait a bit, then start flashing
    const t1 = setTimeout(() => setPhase("flashing"), 2000);
    // 2. Finish flashing and show evolved form
    const t2 = setTimeout(() => {
      setPhase("evolved");
      onEvolvedRevealed?.();
      // Fire confetti
      const end = Date.now() + 3 * 1000;
      const colors = [primaryColor, "#ffffff", "#333333"];
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Fade out the text 3 seconds after evolution
      setTimeout(() => setShowText(false), 3000);
    }, 7000);

    const t3 = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryColor]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative flex-1 flex flex-col items-center justify-center min-h-125 w-full rounded-3xl overflow-hidden"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}25 0%, transparent 70%)`,
        }}
      >
        <div className="relative flex h-80 w-80 items-center justify-center">
          {/* Current Pokemon */}
          {phase !== "evolved" && (
            <motion.img
              src={getSpriteUrl(currentId)}
              alt={currentName}
              className="absolute h-64 w-64 object-contain"
              initial={{ filter: "brightness(1) contrast(1)", scale: 1 }}
              animate={
                phase === "start"
                  ? { filter: silhouetteFilter, scale: 1.2 }
                  : { opacity: [1, 0, 1, 0], scale: [1.2, 0.8, 1.2, 0.8] }
              }
              transition={
                phase === "start"
                  ? { duration: 2, ease: "easeInOut" }
                  : { duration: 0.5, repeat: Infinity, ease: "linear" }
              }
            />
          )}

          {/* Next Pokemon (Flashing Silhouette) */}
          {phase === "flashing" && (
            <motion.img
              src={getSpriteUrl(nextId)}
              alt={nextName}
              className="absolute h-64 w-64 object-contain"
              initial={{ filter: silhouetteFilter, opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1], scale: [0.8, 1.2, 0.8, 1.2] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.25 }}
            />
          )}

          {/* Evolved Pokemon */}
          {phase === "evolved" && (
            <motion.img
              src={getSpriteUrl(nextId)}
              alt={nextName}
              className="absolute h-72 w-72 object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            />
          )}

          {/* Flash Effect on evolution */}
          {phase === "flashing" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-foreground blur-3xl"
              animate={{ opacity: [0, 0.4, 0, 0.6, 1] }}
              transition={{ duration: 5, ease: "easeIn" }}
            />
          )}
        </div>

        {/* Text and Button */}
        <div className="mt-12 text-center h-32">
          {phase === "start" && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-medium tracking-wide text-foreground drop-shadow-sm"
            >
              ¿Qué? ¡{currentName} está evolucionando!
            </motion.p>
          )}
          
          {phase === "evolved" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <AnimatePresence>
                {showText && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold tracking-tight text-foreground drop-shadow-md capitalize text-center"
                  >
                    ¡Enhorabuena! Tu {currentName} ha evolucionado a {nextName}!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
