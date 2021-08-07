import React, { Fragment, useContext, useEffect, useState } from "react";
import PokemonContext from "../context/pokemonContext";
import { Layout, Menu, Input } from "antd";
import "antd/dist/antd.css";
import "./component.css";

const { Search } = Input;
const { Sider } = Layout;
const PokemonList = () => {
    const {
        pokemons,
        getPokemonList,
        allpokemonsList,
        getSelectedPokemonDetails,
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
    );
};

export default PokemonList;
