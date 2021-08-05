import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import {} from "./types";
import PokemonContext from "./pokemonContext";

//useReducer is an alternative to useState.

const PokemonState = (props) => {
    const initialState = {
        pokemons: [],
    };
    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    return (
        <PokemonContext.Provider
            value={{
                pokemons: state.pokemons,
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonState;
