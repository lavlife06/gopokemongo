import React, { useContext, useEffect } from "react";
import PokemonContext from "../context/pokemonContext";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./component.css";

const { Sider } = Layout;
const PokemonSpecifications = () => {
    const {
        getPokemonList,
        pokemonSpecifications,
        changePokemonSpecifications,
    } = useContext(PokemonContext);

    useEffect(() => {
        getPokemonList();
    }, []);

    return (
        <Sider
            width={240}
            className="site-layout-background"
            style={{ marginLeft: "20px", height: "60vh" }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    paddingTop: "6px",
                }}
            >
                <strong> Select Pokemon Specifications</strong>
            </div>
            <hr style={{ backgroundColor: "black" }} />
            <Menu
                mode="inline"
                defaultSelectedKeys={["Detailed Abilities0"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "90%", borderRight: 0 }}
            >
                {pokemonSpecifications.map((item) => (
                    <Menu.Item key={item.id}>
                        {item.display}
                        <input
                            type="checkbox"
                            style={{
                                float: "right",
                                marginTop: "15px",
                            }}
                            onChange={(e) => {
                                changePokemonSpecifications(
                                    item.id,
                                    e.target.checked
                                );
                            }}
                        />
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default PokemonSpecifications;
