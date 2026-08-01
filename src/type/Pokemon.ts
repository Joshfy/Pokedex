// ────────────────────────────────────────────────────────────
// Pokemon Types — REST /api/v2/pokemon/{id}
// ────────────────────────────────────────────────────────────

export interface PokemonListItem {
  id: number;
  name: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    home: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonCries {
  latest: string | null;
  legacy: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;  // decimetres
  weight: number;  // hectograms
  is_default: boolean;
  order: number;
  sprites: PokemonSprites;
  cries: PokemonCries;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

// ────────────────────────────────────────────────────────────
// Paginated list from /api/v2/pokemon-species
// ────────────────────────────────────────────────────────────

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}
