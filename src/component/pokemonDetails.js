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
            <div className="arraydiv" style={{ maxHeight: "170px" }}>
                <strong>{name + "'s "} moves :</strong>
                {moves.map((item) => {
                    return <p>{item.move.name}</p>;
                })}
            </div>
            <div className="arraydiv">
                <strong>Types :</strong>
                {types.map((item) => {
                    return <p>{item.type.name}</p>;
                })}
            </div>
        </Fragment>
    );
};

export default PokemonDetails;
