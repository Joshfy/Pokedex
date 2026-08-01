import { Api } from "@/api/api"

type PokemonSpecie = {
    id: number
    name: string
}

export const getPokemonsBySpecie = async (limit: number, offset: number): Promise<PokemonSpecie> => {
    const { data } = await Api.get("/pokemon-species", {
        params: {
            limit,
            offset
        }
    })

    return data
}