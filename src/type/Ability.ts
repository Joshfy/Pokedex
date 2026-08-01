
export interface ApiLanguage {
  name: string;
  url: string;
}

export interface ApiEffectEntry {
  effect: string;
  short_effect: string;
  language: ApiLanguage;
}

export interface ApiFlavorTextEntry {
  flavor_text: string;
  language: ApiLanguage;
  version_group: {
    name: string;
    url: string;
  };
}

export interface ApiName {
  name: string;
  language: ApiLanguage;
}

export interface ApiAbilityResponse {
  id: number;
  name: string;
  effect_entries: ApiEffectEntry[];
  flavor_text_entries: ApiFlavorTextEntry[];
  names: ApiName[];
}

export interface NormalizedAbility {
  id: number;
  slug: string;
  name: string;
  description: string;
  effectShort: string;
  effectLong: string;
}