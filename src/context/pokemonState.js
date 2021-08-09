import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import {
    UPDATE_SPECIFICATION_DATA,
    CHANGE_SPECIFICATIONS,
    GET_POKEMONS,
    GET_POKEMON_DETAILS,
} from "./types";
import PokemonContext from "./pokemonContext";
import { v4 as uuidv4 } from "uuid";
import {
    getPokemonAbilitiesFunc,
    getPokemonFormsFunc,
    getPokemonSpeciesInfoFunc,
    getPokemonTypesFunc,
} from "./helperFunctions";

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

    const changePokemonSpecifications = async (specificationId, value) => {
        try {
            if (state.pokemon) {
                let newPokemondata = { ...state.pokemon };
                if (value) {
                    for (let item of state.pokemonSpecifications) {
                        if (item.id == specificationId) {
                            let moredetails;

                            if (item.type == "abilities") {
                                moredetails = await getPokemonAbilitiesFunc(
                                    state.pokemon.abilities
                                );
                            } else if (item.type == "forms") {
                                moredetails = await getPokemonFormsFunc(
                                    state.pokemon.forms
                                );
                            } else if (item.type == "species") {
                                moredetails = await getPokemonSpeciesInfoFunc(
                                    state.pokemon.species.url
                                );
                            } else {
                                moredetails = await getPokemonTypesFunc(
                                    state.pokemon.types
                                );
                            }

                            if (newPokemondata.moreSpecificDetails) {
                                newPokemondata.moreSpecificDetails.push({
                                    ...item,
                                    moredetails,
                                });
                            } else {
                                newPokemondata.moreSpecificDetails = [
                                    {
                                        ...item,
                                        moredetails,
                                    },
                                ];
                            }
                        }
                    }
                } else {
                    let filteredData = state.pokemon.moreSpecificDetails.filter(
                        (item) => item.id != specificationId
                    );
                    if (!filteredData.length) {
                        newPokemondata.moreSpecificDetails = null;
                    } else {
                        newPokemondata.moreSpecificDetails = filteredData;
                    }
                }

                dispatch({
                    type: UPDATE_SPECIFICATION_DATA,
                    payload: newPokemondata,
                });
            }
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
                    let moredetails;

                    if (item.type == "abilities") {
                        moredetails = await getPokemonAbilitiesFunc(
                            data.abilities
                        );
                    } else if (item.type == "forms") {
                        moredetails = await getPokemonFormsFunc(data.forms);
                    } else if (item.type == "species") {
                        moredetails = await getPokemonSpeciesInfoFunc(
                            data.species.url
                        );
                    } else {
                        moredetails = await getPokemonTypesFunc(data.types);
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

            data.randomImageId = Math.floor(Math.random()*6)
            
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
