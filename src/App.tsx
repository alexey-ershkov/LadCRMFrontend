import React, {useEffect} from 'react';
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
import JournalPage from "./pages/journalPage/journalPage";
import ArchivePage from "./pages/archivePage/archivePage";
import ModifySubsAndSingleVisitsPage from "./pages/modifySubsAndVisitsPage/ModifySubsAndSingleVisitsPage";
import ModifyClientInfoPage from './pages/modifyClientInfo/ModifyClientInfoPage';
import AddAccountPage from "./pages/addAccountPage/addAccountPage";
import AccountsPage from "./pages/accountsPage/accountsPage";
import LoginPage from "./pages/loginPage/loginPage";
import ping from "./api/utils/ping";

function App() {

    useEffect(() => {
        const interval = setInterval(() => {
            ping()
                .catch()
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Navbar/>
            <div className={'container'}>
                <Switch>
                    <Route path={'/'} exact>
                        <MainPage/>
                    </Route>
                    <Route path={'/login'}>
                        <LoginPage/>
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
                    <Route path={'/subsAndSingleVisits'}>
                        <ModifySubsAndSingleVisitsPage/>
                    </Route>
                    <Route path={'/modifyClient/:modifyId'}>
                        <ModifyClientInfoPage/>
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
                    <Route path={'/journal'}>
                        <JournalPage/>
                    </Route>
                    <Route path={'/archive'}>
                        <ArchivePage/>
                    </Route>
                    <Route path={'/addAccount'}>
                        <AddAccountPage/>
                    </Route>
                    <Route path={'/accounts'}>
                        <AccountsPage/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
