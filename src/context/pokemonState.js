import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import {
    CHANGE_SPECIFICATIONS,
    GET_POKEMONS,
    GET_POKEMON_DETAILS,
} from "./types";
import PokemonContext from "./pokemonContext";
import { v4 as uuidv4 } from "uuid";

//useReducer is an alternative to useState.

const PokemonState = (props) => {
    const initialState = {
        pokemons: [],
        allpokemonsList: [],
        pokemonSpecifications: [
            {
                id: uuidv4(),
                getinformation: false,
                type: "abilities",
                display: "Detailed Abilities",
            },
            {
                id: uuidv4(),
                getinformation: false,
                type: "forms",
                display: "Form's details",
            },
            {
                id: uuidv4(),
                getinformation: false,
                type: "species",
                display: "Species information",
            },
            {
                id: uuidv4(),
                getinformation: false,
                type: "types",
                display: "Types information",
            },
        ],
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

    const changePokemonSpecifications = (specificationId, value) => {
        try {
            dispatch({
                type: CHANGE_SPECIFICATIONS,
                payload: state.pokemonSpecifications.map((item) => {
                    if (item.id == specificationId) {
                        return { ...item, getinformation: value };
                    } else {
                        return item;
                    }
                }),
            });
        } catch (err) {
            alert("Their is some error occured, please try again later");
        }
    };

    const getSelectedPokemonDetails = async (pokemonidorname) => {
        try {
            let selectedPokemonSpecifications = [];

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonidorname}`
            );
            if (response.status == 404) {
                return alert(`No pokemon of ${pokemonidorname} found`);
            }

            let data = await response.json();

            for (let item of state.pokemonSpecifications) {
                if (item.getinformation) {
                    let moredetails = [];

                    if (item.type == "abilities") {
                        for (let ele of data.abilities) {
                            const response = await fetch(ele.ability.url);
                            const specificdata = await response.json();
                            let newObj = {
                                effect_entries: specificdata.effect_entries,
                            };
                            moredetails.push(newObj);
                        }
                    } else if (item.type == "forms") {
                        for (let ele of data.forms) {
                            const response = await fetch(ele.url);
                            const specificdata = await response.json();
                            let newObj = {
                                is_battle_only: specificdata.is_battle_only,
                                is_default: specificdata.is_default,
                                version_group: specificdata.version_group.name,
                            };
                            moredetails.push(newObj);
                        }
                    } else if (item.type == "species") {
                        const response = await fetch(data.species.url);
                        const specificdata = await response.json();
                        let newObj = {
                            generation: specificdata.generation.name,
                            color: specificdata.color.name,
                            shape: specificdata.shape.name,
                            capture_rate: specificdata.capture_rate,
                            base_happiness: specificdata.base_happiness,
                        };
                        moredetails.push(newObj);
                    } else {
                        for (let ele of data.types) {
                            const response = await fetch(ele.type.url);
                            const specificdata = await response.json();
                            let newObj = {
                                generation: specificdata.generation.name,
                                type: specificdata.name,
                                moves: specificdata.moves.length,
                                pokemons: specificdata.pokemon.length,
                            };
                            moredetails.push(newObj);
                        }
                    }

                    selectedPokemonSpecifications.push({
                        ...item,
                        moredetails,
                    });
                }
            }

            if (selectedPokemonSpecifications.length >= 1) {
                data.moreSpecificDetails = selectedPokemonSpecifications;
            } else {
                data.moreSpecificDetails = null;
            }

            console.log(data, "data");
            dispatch({
                type: GET_POKEMON_DETAILS,
                payload: data,
            });
        } catch (error) {
            alert("Their is some error occured, please try again later");
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                pokemons: state.pokemons,
                allpokemonsList: state.allpokemonsList,
                pokemon: state.pokemon,
                pokemonSpecifications: state.pokemonSpecifications,
                getPokemonList,
                getSelectedPokemonDetails,
                changePokemonSpecifications,
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonState;
