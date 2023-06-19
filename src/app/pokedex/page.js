'use client'
import PokemonCard from "@/components/pokemonCard/PokemonCard";
import { useEffect, useState } from "react";
import { bring20PokemonByNumberPage } from "../api/pokeAPI";

export default function Pokedex() {
    const [pokemonList ,setPokemonList] = useState([])
    const [page, setPage] = useState(0)

    useEffect(()=> {
      bring20PokemonByNumberPage(page).then(res => {
        setPokemonList(res.pokemonList)
      })
    },[])

    return (
      <main>
      {pokemonList.length > 0 &&
      pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard pokemon={pokemon} key={index}/>
        )
      })
      }
      </main>
    );
  }