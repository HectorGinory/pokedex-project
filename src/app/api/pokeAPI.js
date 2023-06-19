import axios from "axios";

export const bring20PokemonByNumberPage = async (page) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page*20}&limit=20`)
    const pokemonList = await bringDetailInfoPokemonList(res.data.results)
    const data = {
        totalPokemon: res.data.count,
        pageNumber: page,
        pokemonList: pokemonList
    }
    return data
}

const bringDetailInfoPokemonList = async (results) => {
    const pokemonList = []
    for (let i = 0; i < results.length; i++) {
        const pokemonData = await axios.get(results[i].url)
        pokemonList.push(pokemonData.data)
    }
    return pokemonList
}