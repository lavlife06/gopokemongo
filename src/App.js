import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/home";
import PokemonState from "./context/pokemonState";

const App = () => {
    return (
        <PokemonState>
            <Router>
                <div className="App">
                    {/* <Navbar /> */}
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/* <Route
                                exact
                                path="/"
                                render={() => (
                                    <Fragment>
                                        <Search />
                                        <UsersArray />
                                    </Fragment>
                                )}
                            ></Route> */}
                            {/* <Route
                                exact
                                path="/githubers/:login"
                                component={Userinfo}
                            /> */}
                            {/* <Route component={Notfound} /> */}
                        </Switch>
                    </div>
                </div>
            </Router>
        </PokemonState>
    );
};

export default App;
