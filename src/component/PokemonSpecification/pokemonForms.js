import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "../component.css";

const PokemonForms = ({ details }) => {
    return (
        <Fragment>
            <div
                className="arraydiv"
                style={{
                    marginBottom: "15px",
                }}
            >
                <strong>{details.display + " : "}</strong>
                {details.moredetails.map((forminformation) => (
                    <div style={{ paddingLeft: "15px" }}>
                        <div className="arraydiv">
                            <strong>this form only used in battle :</strong>
                            <p>
                                {forminformation.is_battle_only
                                    ? "true"
                                    : "false"}
                            </p>
                        </div>
                        <div className="arraydiv">
                            <strong>default form :</strong>
                            <p>
                                {forminformation.is_default ? "true" : "false"}
                            </p>
                        </div>
                        <div className="arraydiv">
                            <strong>version_group :</strong>
                            <p>{forminformation.version_group}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default PokemonForms;
