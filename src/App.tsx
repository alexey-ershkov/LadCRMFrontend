import React from 'react';
import './App.scss';
import Navbar from "./navbar/Navbar";
import MainPage from "./pages/main/MainPage";
import AddClientPage from "./pages/addClient/AddClientPage";
import Settings from "./pages/settings/SettingsPage";
import AddSubPage from "./pages/addSub/AddSubPage";
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
                    <Route path={'/settings'}>
                        <Settings/>
                    </Route>
                    <Route path={'/addSub'}>
                        <AddSubPage/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
