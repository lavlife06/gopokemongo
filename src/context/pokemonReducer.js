import { GET_POKEMONS } from "./types";

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
            };
        default:
            return state;
    }
};

export default PokemonReducer;
