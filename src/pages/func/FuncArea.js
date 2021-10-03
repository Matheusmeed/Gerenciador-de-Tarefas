import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotLoggedFunc } from '../../actions/LoginLogoutAction';
import { useSelector } from 'react-redux';
import '../../styles/FuncArea.css';
import MenuAddAtividade from '../../components/MenuAddAtividade';
import { AbrirMenu } from '../../actions/AbrirFecharMenuAction';

export default function FuncArea() {
    const dispatch = useDispatch();
    const history = useHistory();

    function logout() {
        dispatch(NotLoggedFunc);
        history.push('/');
    }

    // Ver se está logado
    const isloggedIn = useSelector((state) => state.LoginLogoutFunc);

    useEffect(() => {
        if (!isloggedIn) {
            history.push('/funcLogin');
        }
    }, [isloggedIn, history]);

    // pegar email do usuário
    const userEmail = useSelector((state) => state.LoggedFuncEmail);

    // Abrir/fechar menu através do state
    const isMenuOpenned = useSelector((state) => state.AbrirFecharMenu);

    useEffect(() => {
        if (isMenuOpenned) {
            setMenuAdd(<MenuAddAtividade userEmail={userEmail} />);
        } else {
            setMenuAdd('');
        }
    }, [isMenuOpenned, userEmail]);

    const [menuAdd, setMenuAdd] = useState('');

    return (
        <div>
            <div className='divAdd'>
                <button
                    className='btnAddAtividade'
                    onClick={() => {
                        dispatch(AbrirMenu);
                    }}
                >
                    Adicionar Atividade
                </button>
                <button className='sair' onClick={() => logout()}>
                    Sair
                </button>
            </div>
            {menuAdd}
        </div>
    );
}
