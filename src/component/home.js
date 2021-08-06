import React, { Fragment, useContext, useEffect, useState } from "react";
import PokemonContext from "../context/pokemonContext";
import { Layout, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./component.css";

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const Home = () => {
    const { pokemons, getPokemonList } = useContext(PokemonContext);
    const [searchedPokemons, setSearchedPokemons] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        getPokemonList();
    }, []);
    console.log("rendered");
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ marginTop: "20px" }}>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </Menu>
                </Sider>
                <Sider
                    width={200}
                    className="site-layout-background"
                    style={{ marginLeft: "20px" }}
                >
                    <Search
                        placeholder="search pokemons"
                        allowClear
                        enterButton
                        value={text}
                        // size="large"
                        onChange={(e) => {
                            setText(e.target.value);
                            if (e.target.value) {
                                setSearchedPokemons(
                                    pokemons.filter(
                                        (item) =>
                                            item.name.substring(
                                                0,
                                                e.target.value.length
                                            ) == e.target.value
                                    )
                                );
                                setIsSearch(true);
                            } else {
                                setSearchedPokemons([]);
                                setIsSearch(false);
                            }
                        }}
                    />
                    <Menu
                        mode="inline"
                        // defaultSelectedKeys={0}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
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
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;

// <div className="">
//     <h2>Pokemons List</h2>
//     {pokemons.map((pokemon, index) => (
//         <div key={index + pokemon.name}>
//             <p>{pokemon.name}</p>
//         </div>
//     ))}
// </div>
