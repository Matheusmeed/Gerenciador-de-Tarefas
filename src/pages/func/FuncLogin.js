import '../../styles/Login.css';
import logoMativi from '../../images/logo-mativi.png';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoggedFunc } from '../../actions/LoginLogoutAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../Api';
import CadastrarFunc from '../../components/CadastrarFunc';

export default function FuncLogin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isloggedIn = useSelector((state) => state.LoginLogoutFunc);

    useEffect(() => {
        if (isloggedIn) {
            history.push('/funcArea');
        }
    }, [isloggedIn, history]);

    // login

    function actionLogin(e, pass) {
        if (!e || !pass) {
            alert('Preencha todos os campos');
        } else {
            Api.actionLogin(e, pass).then((res) => {
                if (res != null) {
                    if (res.uid === 'V2dz4p3T7MOLXZ4o9dTOC2YB79n1') {
                        alert('Conta inválida!');
                    } else if (res.email === email) {
                        dispatch(LoggedFunc);
                        dispatch({ type: 'LOGGED-FUNC-EMAIL', payload: email });
                    }
                } else {
                    alert('Conta inválida');
                }
            });
        }
    }

    // Cadastro
    const [modalCadastro, setModalCadastro] = useState(false);
    const [showModal, setShowModal] = useState('');

    useEffect(() => {
        if (modalCadastro) {
            setShowModal(<CadastrarFunc setModalCadastro={setModalCadastro} />);
        } else {
            setShowModal('');
        }
    }, [modalCadastro]);

    return (
        <div className='index'>
            <main>
                <h1>Olá, funcionário(a)!</h1>

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
                <button
                    onClick={() => {
                        setModalCadastro(true);
                    }}
                >
                    Realizar Cadastro
                </button>
                <button onClick={() => alert('Procure a senha no meu GitHub')}>Esqueci a minha senha</button>
            </main>
            <div className='background'>
                <img alt='logo' src={logoMativi} />
            </div>
            {showModal}
        </div>
    );
}
