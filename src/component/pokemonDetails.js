import React, { Fragment, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
// import { Layout, Menu, Input } from "antd";
import {} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./component.css";

const PokemonDetails = () => {
    const { pokemon } = useContext(PokemonContext);

    const {
        name,
        base_experience,
        height,
        weight,
        order,
        abilities,
        forms,
        held_items,
        moves,
        species,
        types,
        moreSpecificDetails,
    } = pokemon;

    return (
        <Fragment>
            <div>
                <strong>Pokemon :</strong>
                <p>{name}</p>
            </div>
            <div>
                <strong>Height :</strong>
                <p>{height}</p>
            </div>
            <div>
                <strong>Weight :</strong>
                <p>{weight}</p>
            </div>
            <div>
                <strong>Base-Experience :</strong>
                <p>{base_experience}</p>
            </div>
            <div>
                <strong>Order :</strong>
                <p>{order}</p>
            </div>
            <div>
                <strong>Species :</strong>
                <p>{species.name}</p>
            </div>
            <div className="arraydiv">
                <strong>Abilities :</strong>
                {abilities.map((item) => {
                    return <p>{item.ability.name}</p>;
                })}
            </div>
            <div className="arraydiv">
                <strong>Different forms of {name} :</strong>
                {forms.map((form) => {
                    return <p>{form.name}</p>;
                })}
            </div>
            <div className="arraydiv">
                <strong>Different items that {name} carries :</strong>
                {held_items.map((held_item) => {
                    return <p>{held_item.item.name}</p>;
                })}
            </div>
            <div className="arraydiv">
                <strong>Types :</strong>
                {types.map((item) => {
                    return <p>{item.type.name}</p>;
                })}
            </div>
            <div
                className="arraydiv"
                style={{ maxHeight: "120px", marginBottom: "15px" }}
            >
                <strong>{name + "'s "} moves :</strong>
                {moves.map((item) => {
                    return <p>{item.move.name}</p>;
                })}
            </div>
            {moreSpecificDetails &&
                moreSpecificDetails.map((details) => {
                    if (details.type == "abilities") {
                        return (
                            <div className="arraydiv">
                                <strong>{details.display + " : "}</strong>
                                {details.moredetails.map((effectDetails) =>
                                    effectDetails.effect_entries.map((ele) => (
                                        <div style={{ paddingLeft: "15px" }}>
                                            <div className="arraydiv">
                                                <strong>effect :</strong>
                                                <p>{ele.effect}</p>
                                            </div>
                                            <div className="arraydiv">
                                                <strong>short_effect :</strong>
                                                <p>{ele.short_effect}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        );
                    } else if (details.type == "forms") {
                        return (
                            <div className="arraydiv">
                                <strong>{details.display + " : "}</strong>
                                {details.moredetails.map((forminformation) => (
                                    <div style={{ paddingLeft: "15px" }}>
                                        <div className="arraydiv">
                                            <strong>
                                                this form only used in battle :
                                            </strong>
                                            <p>
                                                {forminformation.is_battle_only
                                                    ? "true"
                                                    : "false"}
                                            </p>
                                        </div>
                                        <div className="arraydiv">
                                            <strong>default form :</strong>
                                            <p>
                                                {forminformation.is_default
                                                    ? "true"
                                                    : "false"}
                                            </p>
                                        </div>
                                        <div className="arraydiv">
                                            <strong>version_group :</strong>
                                            <p>
                                                {
                                                    forminformation
                                                        .version_group.name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
        </Fragment>
    );
};

export default PokemonDetails;
