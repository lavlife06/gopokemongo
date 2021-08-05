import React, { useContext, useEffect } from "react";
import PokemonContext from "../context/pokemonContext";

const Home = () => {
    const { pokemons, getPokemonList } = useContext(PokemonContext);

    useEffect(() => {
        getPokemonList();
    }, []);
console.log("rendered")
    return (
        <div className="">
            <h2>Pokemons List</h2>
            {pokemons.map((pokemon, index) => (
                <div key={index + pokemon.name}>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
