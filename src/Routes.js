//React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Páginas
import Home from './pages/Home';
import AdmLogin from './pages/adm/AdmLogin';
import AdmArea from './pages/adm/AdmArea';
import FuncLogin from './pages/func/FuncLogin';
import FuncArea from './pages/func/FuncArea';
//Redux
import { createStore } from 'redux';
import { combineReducers } from 'redux';
//Reducers
import { LoginLogoutFunc, LoginLogoutAdm, LoggedFuncEmail, LoggedAdmEmail } from './reducers/LoginLogoutReducer';
import { AbrirFecharMenu } from './reducers/AbrirFecharMenu';
import { Provider } from 'react-redux';

export default function Routes() {
    const allReducers = combineReducers({
        LoginLogoutFunc: LoginLogoutFunc,
        LoggedFuncEmail: LoggedFuncEmail,
        LoginLogoutAdm: LoginLogoutAdm,
        LoggedAdmEmail: LoggedAdmEmail,
        AbrirFecharMenu: AbrirFecharMenu,
    });
    const store = createStore(allReducers);

    return (
        <BrowserRouter>
            <Switch>
                <Provider store={store}>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/admLogin'>
                        <AdmLogin />
                    </Route>
                    <Route exact path='/funcLogin'>
                        <FuncLogin />
                    </Route>
                    <Route exact path='/AdmArea'>
                        <AdmArea />
                    </Route>
                    <Route exact path='/funcArea'>
                        <FuncArea />
                    </Route>
                </Provider>
            </Switch>
        </BrowserRouter>
    );
}
