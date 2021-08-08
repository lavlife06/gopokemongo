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
    }, []);

    return (
        <Layout style={{ backgroundColor: "transparent" }}>
            <Header className="header">
                <div className="logo">PokemonGo</div>
            </Header>
            <Layout
                style={{ marginTop: "20px", backgroundColor: "transparent" }}
            >
                <PokemonList />
                <PokemonSpecifications />
                <PokemonDetails />
            </Layout>
        </Layout>
    );
};

export default Home;
