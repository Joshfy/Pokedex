// ────────────────────────────────────────────────────────────
// Filter & Pagination Types
// ────────────────────────────────────────────────────────────

export type ViewMode = "paginated" | "filter" | "legendary";

export interface FilterState {
  search: string;
  type: string;
  generation: string;
  mode: ViewMode;
}

export interface PaginationState {
  offset: number;
  limit: number;
  total: number;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  type: "",
  generation: "",
  mode: "paginated",
};

export const DEFAULT_PAGINATION: PaginationState = {
  offset: 0,
  limit: 20,
  total: 0,
};
