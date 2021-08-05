import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import { GET_POKEMONS } from "./types";
import PokemonContext from "./pokemonContext";

//useReducer is an alternative to useState.

const PokemonState = (props) => {
    const initialState = {
        pokemons: [],
    };

    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    const getPokemonList = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const data = await response.json();

            dispatch({
                type: GET_POKEMONS,
                payload: data.results,
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
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonState;
