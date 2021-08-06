import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import { GET_POKEMONS, GET_POKEMON_DETAILS } from "./types";
import PokemonContext from "./pokemonContext";

//useReducer is an alternative to useState.

const PokemonState = (props) => {
    const initialState = {
        pokemons: [],
        pokemon: null,
    };

    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    const getPokemonList = async () => {
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=918&offset=200"
            );
            const data = await response.json();

            dispatch({
                type: GET_POKEMONS,
                payload: data.results,
            });
        } catch (err) {
            alert("Their is some error occured, please try again later");
        }
    };

    const getSelectedPokemonDetails = async (pokemonid) => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonid}`
            );
            const data = await response.json();

            dispatch({
                type: GET_POKEMON_DETAILS,
                payload: data,
            });
        } catch (err) {
            alert("Their is some error occured, please try again later");
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                pokemons: state.pokemons,
                getPokemonList,
                getSelectedPokemonDetails,
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonState;
