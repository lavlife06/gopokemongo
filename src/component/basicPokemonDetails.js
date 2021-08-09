import React, { Fragment, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import pokemonBallImage1 from "../img/pokemon1.png";
import pokemonBallImage2 from "../img/pokemon2.png";
import pokemonBallImage3 from "../img/pokemon3.png";
import pokemonBallImage4 from "../img/pokemon4.png";
import pokemonBallImage5 from "../img/pokemon5.png";
import pokemonBallImage6 from "../img/pokemon6.png";

import "antd/dist/antd.css";
import "./component.css";

const BasicPokemonDetails = () => {
    const { pokemon } = useContext(PokemonContext);
    const arr = [
        pokemonBallImage1,
        pokemonBallImage2,
        pokemonBallImage3,
        pokemonBallImage4,
        pokemonBallImage5,
        pokemonBallImage6,
    ];

    const {
        name,
        base_experience,
        height,
        weight,
        abilities,
        forms,
        moves,
        species,
        types,
        randomImageId
    } = pokemon;

        const randomImageFunction = () => {
        return arr[randomImageId];
    };
    
    return (
        <Fragment>
            <div className="maindiv">
                <div className="pokemonimagediv">
                    <img
                        src={randomImageFunction()}
                        className="pokemonimage"
                        alt="dragon ball pic"
                    />
                    <strong style={{ fontWeight: "bolder", display: "block" }}>
                        {name}
                    </strong>
                </div>
                <div className="subdiv1">
                    <div className="div1">
                        <strong className="subdivstrong">Pokemon :</strong>
                        <p>{name}</p>
                    </div>
                    <div className="div2">
                        <strong className="subdivstrong">Height :</strong>
                        <p>{height}</p>
                    </div>
                    <div className="div1">
                        <strong className="subdivstrong">Weight :</strong>
                        <p>{weight}</p>
                    </div>
                    <div className="div2">
                        <strong className="subdivstrong">
                            Base-Experience :
                        </strong>
                        <p>{base_experience}</p>
                    </div>
                </div>
                <div className="subdiv2">
                    <div className="div2">
                        <strong className="subdivstrong">Species :</strong>
                        <p>{species.name}</p>
                    </div>
                    <div className="arraydiv div1">
                        <strong className="subdivstrong">Abilities :</strong>
                        {abilities.map((item) => {
                            return <p>{item.ability.name}</p>;
                        })}
                    </div>
                    <div className="arraydiv div2">
                        <strong className="subdivstrong">
                            Different forms :
                        </strong>
                        {forms.map((form) => {
                            return <p>{form.name}</p>;
                        })}
                    </div>
                    <div className="arraydiv div1">
                        <strong className="subdivstrong">Types :</strong>
                        {types.map((item) => {
                            return <p>{item.type.name}</p>;
                        })}
                    </div>
                </div>
            </div>
            <strong style={{ marginTop: "7px", fontWeight: "bolder" }}>
                {name + "'s "} moves :
            </strong>
            <div
                className="arraydiv"
                style={{
                    marginTop: "7px",
                    maxHeight: "120px",
                    marginBottom: "15px",
                    display: "inline-block",
                }}
            >
                {moves.map((item) => {
                    return <p>{item.move.name}</p>;
                })}
            </div>
        </Fragment>
    );
};

export default BasicPokemonDetails;
