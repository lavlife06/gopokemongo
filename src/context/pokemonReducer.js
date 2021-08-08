import {
    CHANGE_SPECIFICATIONS,
    GET_POKEMONS,
    GET_POKEMON_DETAILS,
    UPDATE_SPECIFICATION_DATA,
} from "./types";

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload.slice(0, 200),
                allpokemonsList: payload,
            };
        case GET_POKEMON_DETAILS:
        case UPDATE_SPECIFICATION_DATA:
            return {
                ...state,
                pokemon: payload,
            };
        case CHANGE_SPECIFICATIONS:
            return {
                ...state,
                pokemonSpecifications: payload,
            };
        default:
            return state;
    }
};

export default PokemonReducer;
