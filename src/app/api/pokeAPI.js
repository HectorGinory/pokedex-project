import axios from "axios";

export const bring20PokemonByNumberPage = async (page) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page*20}&limit=20`)
    const pokemonList = []
    for (let i = 0; i < res.data.results.length; i++) {
        const pokemonData = await axios.get(res.data.results[i].url)
        pokemonList.push(pokemonData.data)
    }
    const data = {
        totalPokemon: res.data.count,
        pageNumber: page,
        pokemonList: pokemonList
    }
    return data
}