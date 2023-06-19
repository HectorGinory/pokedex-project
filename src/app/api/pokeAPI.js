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
export const bringPokemonByRegExp = async(page, criteria) => {
    const allPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281`)
    const regExp = new RegExp(criteria)
    const filteredPokemon = allPokemon.data.results.filter((pokemon) => regExp.test(pokemon.name))
    const firstIndexOfPage = page*20
    const lastIndexOfPage = (page+1)*20 > filteredPokemon.length ? filteredPokemon.length : (page+1)*20
    const paginatePokemon = filteredPokemon.slice(firstIndexOfPage, lastIndexOfPage)
    const pokemonList = await bringDetailInfoPokemonList(paginatePokemon)
    const data = {
        totalPokemon: allPokemon.length,
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