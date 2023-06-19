'use client'
import { useEffect, useState } from "react";

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
      </main>
    );
  }