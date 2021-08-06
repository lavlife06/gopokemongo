import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "./component.css";

const PokemonTypes = ({ details }) => {
    return (
        <Fragment>
            <div className="arraydiv">
                <strong>{details.display + " : "}</strong>
                {details.moredetails.map((pokemonTypesInformation) => (
                    <div style={{ paddingLeft: "15px" }}>
                        <div className="arraydiv">
                            <strong>type :</strong>
                            <p>{pokemonTypesInformation.type}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>generation :</strong>
                            <p>{pokemonTypesInformation.generation}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>pokemon moves :</strong>
                            <p>{pokemonTypesInformation.moves}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>pokemons of this type :</strong>
                            <p>{pokemonTypesInformation.pokemons}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default PokemonTypes;
