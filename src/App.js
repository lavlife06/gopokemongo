import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonState from "./context/pokemonState";

const App = () => {
    return (
        <PokemonState>
            <Router>
                <div className="App">
                    <div className="container">Home page</div>
                </div>
            </Router>
        </PokemonState>
    );
};

export default App;
