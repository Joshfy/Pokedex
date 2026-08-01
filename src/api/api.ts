import axios from "axios"

export const Api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
})

export const Apicolor = axios.create({
    baseURL: "https://www.pokemonpalette.com",
})