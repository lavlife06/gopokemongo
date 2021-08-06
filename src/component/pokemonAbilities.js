import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "./component.css";

const PokemonAbilities = ({ details }) => {
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default PokemonAbilities;
