import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "./component.css";

const PokemonSpecies = ({ details }) => {
    return (
        <Fragment>
            <strong>{details.display + " : "}</strong>
            <div
                className="arraydiv"
                style={{
                    marginTop: "7px",
                    marginBottom: "15px",
                    // display: "inline-block",
                }}
            >
                {details.moredetails.map((speciesinformation) => (
                    <div style={{ paddingLeft: "15px" }}>
                        <div className="arraydiv">
                            <strong>generation :</strong>
                            <p>{speciesinformation.generation}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>color :</strong>
                            <p>{speciesinformation.color}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>shape :</strong>
                            <p>{speciesinformation.shape}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>capture_rate :</strong>
                            <p>{speciesinformation.capture_rate}</p>
                        </div>
                        <div className="arraydiv">
                            <strong>base_happiness :</strong>
                            <p>{speciesinformation.base_happiness}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default PokemonSpecies;
