import '../styles/MenuAddAtividade.css';
import { useDispatch } from 'react-redux';
import { FecharMenu } from '../actions/AbrirFecharMenuAction';
import Api from '../Api';

export default function MenuAddAtividade(props) {
    const dispatch = useDispatch();

    //Pegar data e hora
    const _data = new Date();
    let dia = _data.getDate();
    let mes = _data.getMonth();
    let ano = _data.getFullYear();
    let hora = _data.getHours();
    let minuto = _data.getMinutes();

    let title = '';
    let user = '';
    let desc = '';
    let status = '';
    let userEmail = props.userEmail;
    let data = `${dia}/${mes + 1}/${ano}`;
    let horario = `${hora}:${minuto}`;

    function adicionarAtividade() {
        if (!title || !user || !desc || !status) {
            alert('Preencha todos os campos!');
        } else {
            Api.addDocument(title, status, desc, user, userEmail, data, horario);
            dispatch(FecharMenu);
            setTimeout(() => {
                alert('Atividade adicionada com sucesso!');
            }, 200);
        }
    }

    return (
        <div
            className='fundo'
            onClick={(el) => {
                if (el.target.className === 'fundo') {
                    dispatch(FecharMenu);
                }
            }}
        >
            <div className='menuAddAtividade'>
                <div className='escolherStatus linha'>
                    <h3>Status:</h3>
                    <input
                        type='radio'
                        id='pendente'
                        name='status'
                        value='pendente'
                        onClick={() => {
                            status = 'Pendente';
                        }}
                    />
                    <label htmlFor='pendente'>Pendente</label>
                    <input
                        type='radio'
                        id='andamento'
                        name='status'
                        value='andamento'
                        onClick={() => {
                            status = 'Em andamento';
                        }}
                    />
                    <label htmlFor='andamento'>Em andamento</label>
                    <input
                        type='radio'
                        id='finalizada'
                        name='status'
                        value='finalizada'
                        onClick={() => {
                            status = 'Finalizada';
                        }}
                    />
                    <label htmlFor='finalizada'>Finalizada</label>
                    <input
                        type='radio'
                        id='cancelada'
                        name='status'
                        value='cancelada'
                        onClick={() => {
                            status = 'Cancelada';
                        }}
                    />
                    <label htmlFor='cancelada'>Cancelada</label>
                </div>
                <div className='linha'>
                    <h3>Título:</h3>
                    <input
                        type='text'
                        onChange={(el) => {
                            title = el.target.value;
                        }}
                    ></input>
                </div>
                <div className='linha'>
                    <h3>Usuário:</h3>
                    <input
                        type='text'
                        onChange={(el) => {
                            user = el.target.value;
                        }}
                    ></input>
                </div>
                <div className='linha'>
                    <h3>Descrição</h3>
                    <textarea
                        onChange={(el) => {
                            desc = el.target.value;
                        }}
                    ></textarea>
                </div>
                <div className='lastBtns'>
                    <button onClick={() => adicionarAtividade()}>Adicionar</button>
                    <button onClick={() => dispatch(FecharMenu)}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
