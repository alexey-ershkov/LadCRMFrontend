import React from 'react';
import './App.scss';
import Navbar from "./navbar/Navbar";
import MainPage from "./pages/main/MainPage";
import AddClientPage from "./pages/addClient/AddClientPage";
import Settings from "./pages/settings/SettingsPage";
import AddSubPage from "./pages/addSubType/AddSubPage";
import AddSingleVisitPage from "./pages/addSingleVisitType/AddSingleVisitPage";
import ClientPage from './pages/clientPage/ClientPage';
import SubPage from "./pages/subPage/SubPage";
import {Switch, Route} from 'react-router-dom';

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
                    <Route path={'/addSubType'}>
                        <AddSubPage/>
                    </Route>
                    <Route path={'/addSingleVisitType'}>
                        <AddSingleVisitPage/>
                    </Route>
                    <Route path={'/client/:id'}>
                        <ClientPage/>
                    </Route>
                    <Route path={'/subscription/:id'}>
                        <SubPage/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
