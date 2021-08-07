import React, { useContext, useEffect } from "react";
import PokemonContext from "../context/pokemonContext";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./component.css";
import PokemonDetails from "./pokemonDetails";
import PokemonList from "./pokemonList";
import PokemonSpecifications from "./pokemonSpecifications";

const { Header } = Layout;
const Home = () => {
    const { getPokemonList } = useContext(PokemonContext);

    useEffect(() => {
        getPokemonList();
        console.log("rendered inside useeffect");
    }, []);

    console.log("rendered");
    return (
        <Layout>
            <Header className="header">
                <div className="logo">PokemonGo</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ float: "right" }}
                >
                    <Menu.Item key="1">Home</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ marginTop: "20px" }}>
                <PokemonList />
                <PokemonSpecifications />
                <PokemonDetails />
            </Layout>
        </Layout>
    );
};

export default Home;
