import '../styles/CadastrarFunc.css';
import Api from '../Api';

function CadastrarFunc(props) {
    let email;
    let senha;
    let confirmarSenha;

    function handleCadastrar(email, senha, confirmarSenha) {
        if (!email || !senha || !confirmarSenha) {
            alert('Preencha todos os campos');
        } else if (senha !== confirmarSenha) {
            alert('As senhas não são iguais');
        } else {
            Api.createUserWithEmailAndPassword(email, senha);
        }
    }
    return (
        <div
            id='fundo'
            onClick={(el) => {
                if (el.target.id === 'fundo') {
                    props.setModalCadastro(false);
                }
            }}
        >
            <div id='modalCadastrar'>
                <h3>Email</h3>
                <input
                    type='text'
                    onChange={(el) => {
                        email = el.target.value;
                    }}
                ></input>
                <h3>Senha</h3>
                <input
                    type='password'
                    onChange={(el) => {
                        senha = el.target.value;
                    }}
                ></input>
                <h3>Confirmar senha</h3>
                <input
                    type='password'
                    onChange={(el) => {
                        confirmarSenha = el.target.value;
                    }}
                ></input>
                <button id='cadastrar' onClick={() => handleCadastrar(email, senha, confirmarSenha)}>
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

export default CadastrarFunc;
