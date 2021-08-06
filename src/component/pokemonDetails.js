import React, { Fragment, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import "antd/dist/antd.css";
import "./component.css";
import BasicPokemonDetails from "./basicPokemonDetails";
import PokemonAbilities from "./pokemonAbilities";
import PokemonForms from "./pokemonForms";
import PokemonSpecies from "./pokemonSpecies";
import PokemonTypes from "./pokemonTypes";

const PokemonDetails = () => {
    const { pokemon } = useContext(PokemonContext);

    const { moreSpecificDetails } = pokemon;

    return (
        <Fragment>
            <BasicPokemonDetails />
            {moreSpecificDetails &&
                moreSpecificDetails.map((details) => {
                    if (details.type == "abilities") {
                        return <PokemonAbilities details={details} />;
                    } else if (details.type == "forms") {
                        return <PokemonForms details={details} />;
                    } else if (details.type == "species") {
                        return <PokemonSpecies details={details} />;
                    } else {
                        return <PokemonTypes details={details} />;
                    }
                })}
        </Fragment>
    );
};

export default PokemonDetails;
