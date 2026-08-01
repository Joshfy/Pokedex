/**
 * Mapa de colores por tipo de Pokémon.
 * Usado para aplicar estilos dinámicos a Badges, bordes, etc.
 */
export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  normal:   { bg: "#a8a77a", text: "#fff" },
  fire:     { bg: "#ee8130", text: "#fff" },
  water:    { bg: "#6390f0", text: "#fff" },
  electric: { bg: "#f7d02c", text: "#000" },  
  grass:    { bg: "#7ac74c", text: "#fff" },
  ice:      { bg: "#96d9d6", text: "#000" },
  fighting: { bg: "#c22e28", text: "#fff" },
  poison:   { bg: "#a33ea1", text: "#fff" },
  ground:   { bg: "#e2bf65", text: "#000" },
  flying:   { bg: "#a98ff3", text: "#fff" },
  psychic:  { bg: "#f95587", text: "#fff" },
  bug:      { bg: "#a6b91a", text: "#fff" },
  rock:     { bg: "#b6a136", text: "#fff" },
  ghost:    { bg: "#735797", text: "#fff" },
  dragon:   { bg: "#6f35fc", text: "#fff" },
  dark:     { bg: "#705746", text: "#fff" },
  steel:    { bg: "#b7b7ce", text: "#000" },
  fairy:    { bg: "#d685ad", text: "#fff" },
};

/**
 * Retorna el color de fondo y texto para un tipo de Pokémon dado.
 * Fallback: gris neutro.
 */
export function getTypeColor(typeName: string): { bg: string; text: string } {
  return TYPE_COLORS[typeName] ?? { bg: "#9ca3af", text: "#fff" };
}
