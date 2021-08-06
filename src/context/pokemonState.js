import React, { useReducer } from "react";
import PokemonReducer from "./pokemonReducer";
import { GET_POKEMONS, GET_POKEMON_DETAILS } from "./types";
import PokemonContext from "./pokemonContext";

//useReducer is an alternative to useState.

const PokemonState = (props) => {
    const initialState = {
        pokemons: [],
        pokemonSpecifications: [
            {
                id: 0,
                getinformation: true,
                type: "abilities",
                display: "Detailed Abilities",
            },
            {
                id: 1,
                getinformation: true,
                type: "forms",
                display: "Form's details",
            },
            {
                id: 2,
                getinformation: false,
                type: "species",
                display: "Species information",
            },
            {
                id: 3,
                getinformation: false,
                type: "held_items",
                display: "Held_item's details",
            },
            {
                id: 4,
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

    const getSelectedPokemonDetails = async (pokemonid) => {
        try {
            let selectedPokemonSpecifications = [];

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonid}`
            );
            let data = await response.json();

            for (let item of state.pokemonSpecifications) {
                if (item.getinformation) {
                    let moredetails = [];

                    if (item.type == "abilities") {
                        for (let ele of data.abilities) {
                            const response = await fetch(ele.ability.url);
                            const specificdata = await response.json();
                            console.log(specificdata, "specificdata");
                            moredetails.push(specificdata);
                        }
                    } else if (item.type == "forms") {
                        for (let ele of data.forms) {
                            const response = await fetch(ele.url);
                            const specificdata = await response.json();
                            console.log(specificdata, "specificdata");
                            moredetails.push(specificdata);
                        }
                    } else if (item.type == "species") {
                        const response = await fetch(data.species.url);
                        const specificdata = await response.json();
                        console.log(specificdata, "specificdata");
                        moredetails.push(specificdata);
                    } else if (item.type == "held_items") {
                        for (let ele of data.held_items) {
                            const response = await fetch(ele.item.url);
                            const specificdata = await response.json();
                            console.log(specificdata, "specificdata");
                            moredetails.push(specificdata);
                        }
                    } else {
                        for (let ele of data.types) {
                            const response = await fetch(ele.type.url);
                            const specificdata = await response.json();
                            console.log(specificdata, "specificdata");
                            moredetails.push(specificdata);
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
        } catch (err) {
            // alert("Their is some error occured, please try again later");
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                pokemons: state.pokemons,
                pokemon: state.pokemon,
                pokemonSpecifications: state.pokemonSpecifications,
                getPokemonList,
                getSelectedPokemonDetails,
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonState;
