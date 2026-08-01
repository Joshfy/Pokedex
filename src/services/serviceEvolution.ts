import { Api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { EvolutionChain } from "@/type/Evolution";

export const getEvolutionChain = async (id: number): Promise<EvolutionChain> => {
  const { data } = await Api.get<EvolutionChain>(`/evolution-chain/${id}`);
  return data;
};

export const getEvolutionChainByUrl = async (url: string): Promise<EvolutionChain> => {
  const { data } = await Api.get<EvolutionChain>(url, { baseURL: "" });
  return data;
};

export const useGetEvolutionChain = (id: number) => {
  return useQuery({
    queryKey: ["evolution-chain", id],
    queryFn: () => getEvolutionChain(id),
    enabled: id > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};