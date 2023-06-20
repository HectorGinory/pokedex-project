import axios from "axios"

export const bringMealByFirstPokemonLetter = async(pokemonName) => {
    let charIndex = 0
    let res = {
        data: {
            meals: null
        }
    }
    
    while(!res.data.meals) {
        res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${pokemonName.charAt(charIndex)}`)
        charIndex++
    }

    return res
}