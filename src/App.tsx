import React from 'react';
import './App.scss';
import Navbar from "./navbar/Navbar";
import MainPage from "./mainPage/MainPage";
import AddClientPage from "./addClient/AddClientPage";
import {Switch, Route} from 'react-router-dom'

function App() {
    return (
        <div>
            <Navbar/>
            <div className={'container'}>
                <Switch>
                    <Route path={'/'} exact>
                        <MainPage/>
                    </Route>
                    <Route path={'/addClient'}>
                        <AddClientPage/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
