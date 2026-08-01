
export interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: { 
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface EggGroup {
  name: string;
  url: string;
}

export interface PokemonColor {
  name: string;
  url: string;
}

export interface PokemonHabitat {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  genera: Genus[];
  flavor_text_entries: FlavorTextEntry[];
  egg_groups: EggGroup[];
  color: PokemonColor;
  habitat: PokemonHabitat | null;
  evolution_chain: {
    url: string;
  };
  generation: {
    name: string;
    url: string;
  };
}
