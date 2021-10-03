import '../../styles/Login.css';
import logoMativi from '../../images/logo-mativi.png';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoggedAdm } from '../../actions/LoginLogoutAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../Api';

export default function AdmLogin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isloggedIn = useSelector((state) => state.LoginLogoutAdm);

    useEffect(() => {
        if (isloggedIn) {
            history.push('/AdmArea');
        }
    }, [isloggedIn, history]);

    function actionLogin(e, pass) {
        if (!e || !pass) {
            alert('Preencha todos os campos');
        } else {
            Api.actionLogin(e, pass).then((res) => {
                if (res != null) {
                    if (res.uid === 'V2dz4p3T7MOLXZ4o9dTOC2YB79n1' || res.uid === 'aU1nlH9uwuaryCWzio9WHYovdI32') {
                        dispatch(LoggedAdm);
                        dispatch({ type: 'LOGGED-ADM-EMAIL', payload: email });
                    } else {
                        alert('Conta inválida!');
                    }
                } else {
                    alert('Conta inválida!');
                }
            });
        }
    }

    return (
        <div className='index'>
            <main>
                <h1>Olá, administrador(a)!</h1>

                <h2>Faça o seu login</h2>
                <input type='email' id='email' placeholder='Email' onChange={(element) => setEmail(element.target.value)} />
                <input type='password' onChange={(element) => setPassword(element.target.value)} id='senha' placeholder='Senha' />
                <button
                    className='btnAcessar'
                    onClick={() => {
                        actionLogin(email, password);
                    }}
                >
                    ACESSAR
                </button>
                <button onClick={() => alert('Procure a senha no meu GitHub')}>Esqueci a minha senha</button>
            </main>
            <div className='background'>
                <img alt='logo' src={logoMativi} />
            </div>
        </div>
    );
}
