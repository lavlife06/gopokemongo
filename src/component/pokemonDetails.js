import React, { Fragment, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import BasicPokemonDetails from "./basicPokemonDetails";
import PokemonAbilities from "./PokemonSpecification/pokemonAbilities";
import PokemonForms from "./PokemonSpecification/pokemonForms";
import PokemonSpecies from "./PokemonSpecification/pokemonSpecies";
import PokemonTypes from "./PokemonSpecification/pokemonTypes";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./component.css";

const { Content } = Layout;

const PokemonDetails = () => {
    const { pokemon } = useContext(PokemonContext);

    return (
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "aqua" }}>
            <Content
                className="site-layout-background content"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: "60vh",
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                {!pokemon ? (
                    <Fragment>
                        <div>
                            <h1>Pokemon Details</h1>
                            <hr style={{ backgroundColor: "black" }} />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>
                                Selected Pokemon's details will be shown here
                            </h1>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <h1>Pokemon Details</h1>
                            <hr style={{ backgroundColor: "black" }} />
                        </div>
                        <BasicPokemonDetails />
                        {pokemon.moreSpecificDetails &&
                            pokemon.moreSpecificDetails.map((details) => {
                                if (details.type == "abilities") {
                                    return (
                                        <PokemonAbilities details={details} />
                                    );
                                } else if (details.type == "forms") {
                                    return <PokemonForms details={details} />;
                                } else if (details.type == "species") {
                                    return <PokemonSpecies details={details} />;
                                } else {
                                    return <PokemonTypes details={details} />;
                                }
                            })}
                    </Fragment>
                )}
            </Content>
        </Layout>
    );
};

export default PokemonDetails;
