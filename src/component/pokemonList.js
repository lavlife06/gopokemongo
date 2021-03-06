import React, { Fragment, useContext, useEffect, useState } from "react";
import PokemonContext from "../context/pokemonContext";
import pokemonBallImage from "../img/ball.png";

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

    return (
        <Sider width={220} className="site-layout-background listsider">
            <div className="diviframe">
                <iframe
                    src="https://giphy.com/embed/uLnPIWsqIz2aA"
                    title="gif of pokemon"
                />
            </div>
            <Search
                placeholder="search pokemons"
                allowClear
                enterButton
                value={text}
                onChange={(e) => {
                    onChangeHandler(e);
                }}
                onSearch={(value) => {
                    if (value) {
                        getSelectedPokemonDetails(value);
                    }
                }}
            />
            <Menu
                className="menu"
                mode="inline"
                defaultOpenKeys={["sub1"]}
                onClick={(e) => {
                    getSelectedPokemonDetails(parseInt(e.key[0]) + 1);
                }}
            >
                {!isSearch ? (
                    pokemons.map((pokemon, index) => (
                        <Menu.Item
                            className="menuitem"
                            key={index + pokemon.name}
                        >
                            <img
                                className="pokemonballimage"
                                src={pokemonBallImage}
                                alt="dragon ball pic"
                            />
                            {pokemon.name}
                        </Menu.Item>
                    ))
                ) : (
                    <Fragment>
                        {searchedPokemons.length >= 1 ? (
                            searchedPokemons.map((pokemon, index) => (
                                <Menu.Item
                                    className="menuitem"
                                    key={index + pokemon.name}
                                >
                                    <img
                                        className="pokemonballimage"
                                        src={pokemonBallImage}
                                        alt="dragon ball pic"
                                    />
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
