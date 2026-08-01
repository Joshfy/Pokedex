import { type ApiAbilityResponse, type NormalizedAbility, type ApiLanguage } from "@/type/Ability";
import { Api } from "@/api/api";
export function normalizeAbility(
  data: ApiAbilityResponse,
  targetLang: string = 'es'
): NormalizedAbility {
  // Helper para buscar traduciendo con fallback a inglés ('en')
  const findLocalized = <T extends { language: ApiLanguage }>(
    entries: T[]
  ): T | undefined => {
    return (
      entries.find((e) => e.language.name === 'es-419') ||
      entries.find((e) => e.language.name === 'en')     
    );
  };

  // 1. Obtener Nombre traducido
  const localizedName = findLocalized(data.names);
  const name = localizedName ? localizedName.name : data.name;

  // 2. Obtener Efecto Detallado (Short y Long)
  const localizedEffect = findLocalized(data.effect_entries);

  // 3. Obtener el Flavor Text más reciente (el último del array suele ser de la gen más reciente)
  const localizedFlavors = data.flavor_text_entries.filter(
    (f) => f.language.name === targetLang || f.language.name === 'es-419' || f.language.name === 'es-419'
  );
  
  const lastFlavor = localizedFlavors.length > 0 
    ? localizedFlavors[localizedFlavors.length - 1].flavor_text 
    : '';

  // 4. Limpieza de caracteres raros/saltos de línea (\n, \f, \r)
  const cleanText = (text: string) =>
    text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    id: data.id,
    slug: data.name,
    name,
    description: cleanText(lastFlavor),
    effectShort: cleanText(localizedEffect?.short_effect || ''),
    effectLong: cleanText(localizedEffect?.effect || ''),
  };
}

export async function fetchAbilityByUrl(url: string, targetLang: string = "es"): Promise<NormalizedAbility> {
  const response = await Api.get<ApiAbilityResponse>(url);
  return normalizeAbility(response.data, targetLang);
}

import { useQuery } from "@tanstack/react-query";

export function useGetAbility(url: string) {
  return useQuery({
    queryKey: ["ability", url],
    queryFn: () => fetchAbilityByUrl(url),
    staleTime: 1000 * 60 * 60 * 24, // 24 horas (las habilidades no cambian a menudo)
  });
}