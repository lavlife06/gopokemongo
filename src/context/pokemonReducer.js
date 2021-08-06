import { GET_POKEMONS, GET_POKEMON_DETAILS } from "./types";

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
            };
        case GET_POKEMON_DETAILS:
            return {
                ...state,
                pokemon: payload,
            };
        default:
            return state;
    }
};

export default PokemonReducer;
