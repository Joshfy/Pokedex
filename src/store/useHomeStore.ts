import { create } from "zustand";
import { DEFAULT_FILTERS, type FilterState } from "@/type/Filters";

interface HomeState {
  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  setMode: (mode: FilterState["mode"]) => void;

  // Pagination
  offset: number;
  limit: number;
  total: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;

  // Scroll Position
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  filters: DEFAULT_FILTERS,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setMode: (mode) =>
    set((state) => ({ filters: { ...state.filters, mode } })),

  offset: 0,
  limit: 15,
  total: 0,
  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),
  setTotal: (total) => set({ total }),
  nextPage: () => set((state) => ({ offset: state.offset + state.limit })),
  prevPage: () =>
    set((state) => ({ offset: Math.max(0, state.offset - state.limit) })),
  resetPagination: () => set({ offset: 0 }),

  scrollPosition: 0,
  setScrollPosition: (scrollPosition) => set({ scrollPosition }),
}));
