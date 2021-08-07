import React, { Fragment, useContext, useEffect, useState } from "react";
import PokemonContext from "../context/pokemonContext";
import { Layout, Menu, Input } from "antd";
import "antd/dist/antd.css";
import "./component.css";
import PokemonDetails from "./pokemonDetails";

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const Home = () => {
    const {
        pokemons,
        getPokemonList,
        allpokemonsList,
        getSelectedPokemonDetails,
        pokemon,
        pokemonSpecifications,
        changePokemonSpecifications,
    } = useContext(PokemonContext);
    const [searchedPokemons, setSearchedPokemons] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        getPokemonList();
        console.log("rendered inside useeffect");
    }, []);

    const onChangeHandler = (e) => {
        setText(e.target.value);
        if (e.target.value) {
            setSearchedPokemons(
                allpokemonsList.filter(
                    (item) =>
                        item.name.substring(0, e.target.value.length) ==
                        e.target.value
                )
            );
            setIsSearch(true);
        } else {
            setSearchedPokemons([]);
            setIsSearch(false);
        }
    };

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
                <Sider
                    width={200}
                    className="site-layout-background"
                    style={{ marginLeft: "10px", height: "60vh" }}
                >
                    <Search
                        placeholder="search pokemons"
                        allowClear
                        enterButton
                        value={text}
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        onSearch={(value) => {
                            console.log(value);
                            if (value) {
                                getSelectedPokemonDetails(value);
                            }
                        }}
                    />
                    <Menu
                        mode="inline"
                        defaultOpenKeys={["sub1"]}
                        style={{
                            height: "93%",
                            borderRight: "0px",
                            overflowY: "auto",
                            overflowX: "hidden",
                        }}
                        onClick={(e) => {
                            getSelectedPokemonDetails(parseInt(e.key[0]) + 1);
                        }}
                    >
                        {!isSearch ? (
                            pokemons.map((pokemon, index) => (
                                <Menu.Item key={index + pokemon.name}>
                                    {pokemon.name}
                                </Menu.Item>
                            ))
                        ) : (
                            <Fragment>
                                {searchedPokemons.length >= 1 ? (
                                    searchedPokemons.map((pokemon, index) => (
                                        <Menu.Item key={index + pokemon.name}>
                                            {pokemon.name}
                                        </Menu.Item>
                                    ))
                                ) : (
                                    <h1
                                        style={{
                                            textAlign: "center",
                                            marginTop: "100px",
                                        }}
                                    >
                                        No such pokemon found
                                    </h1>
                                )}
                            </Fragment>
                        )}
                    </Menu>
                </Sider>
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
                            fontSize: "16px",
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
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "280px",
                            maxHeight: "80vh",
                            overflowY: "auto",
                        }}
                    >
                        {!pokemon ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <h1>
                                    Selected Pokemon's details will be shown
                                    here
                                </h1>
                            </div>
                        ) : (
                            <PokemonDetails />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
