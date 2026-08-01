export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
    url: string;
  };
  item: { name: string; url: string } | null;
  held_item: { name: string; url: string } | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: null;
  turn_upside_down: boolean;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: EvolutionChainLink;
}

export interface EvolutionStep {
  id: number;
  name: string;
  minLevel: number | null;
  trigger: string | null;
}
