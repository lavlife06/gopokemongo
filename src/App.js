import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/home";
import PokemonState from "./context/pokemonState";
import "./App.css";

const App = () => {
    return (
        <PokemonState>
            <Router>
                <div className="App">
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </PokemonState>
    );
};

export default App;
