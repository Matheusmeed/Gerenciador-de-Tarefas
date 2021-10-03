import Api from '../Api';
import '../styles/MenuAtualizarAtividade.css';
import { useSelector } from 'react-redux';

export default function MenuAtualizarAtividade(props) {
    //Pegar data e hora
    const _data = new Date();
    let dia = _data.getDate();
    let mes = _data.getMonth();
    let ano = _data.getFullYear();
    let hora = _data.getHours();
    let minuto = _data.getMinutes();
    let admData = `${dia}/${mes + 1}/${ano}`;
    let admHorario = `${hora}:${minuto}`;

    let title = props.title;
    let user = props.user;
    let desc = props.desc;
    let status = props.status;
    let id = props.id;
    let admEmail = useSelector((state) => state.LoggedAdmEmail);

    function atualizarAtividade(id, status, desc, title, user, admEmail, admData, admHorario) {
        if (!title || !user || !desc || !status) {
            alert('Preencha todos os campos!');
        } else {
            Api.updateAtividades(id, status, desc, title, user, admEmail, admData, admHorario);
            setTimeout(() => {
                props.atualizarListaAtv();
                props.setMenu(false);
            }, 400);
        }
    }

    function deleteAtividade(id) {
        Api.deleteAtividade(id);
        setTimeout(() => {
            props.atualizarListaAtv();
            props.setMenu(false);
        }, 500);
    }

    return (
        <div className='fundo2'>
            <div className='menuAddAtividade'>
                <div className='escolherStatus linha'>
                    <h3>Status:</h3>
                    <input
                        type='radio'
                        id='pendente2'
                        name='status'
                        onClick={() => {
                            status = 'Pendente';
                        }}
                    />
                    <label htmlFor='pendente2'>Pendente</label>
                    <input
                        type='radio'
                        id='andamento2'
                        name='status'
                        onClick={() => {
                            status = 'Em andamento';
                        }}
                    />
                    <label htmlFor='andamento2'>Em andamento</label>
                    <input
                        type='radio'
                        id='finalizada2'
                        name='status'
                        onClick={() => {
                            status = 'Finalizada';
                        }}
                    />
                    <label htmlFor='finalizada2'>Finalizada</label>
                    <input
                        type='radio'
                        id='cancelada2'
                        name='status'
                        onClick={() => {
                            status = 'Cancelada';
                        }}
                    />
                    <label htmlFor='cancelada2'>Cancelada</label>
                </div>
                <div className='linha'>
                    <h3>Título:</h3>
                    <input
                        defaultValue={title}
                        type='text'
                        onChange={(el) => {
                            title = el.target.value;
                        }}
                    ></input>
                </div>
                <div className='linha'>
                    <h3>Usuário:</h3>
                    <input
                        defaultValue={user}
                        type='text'
                        onChange={(el) => {
                            user = el.target.value;
                        }}
                    ></input>
                </div>
                <div className='linha'>
                    <h3>Descrição</h3>
                    <textarea
                        defaultValue={desc}
                        onChange={(el) => {
                            desc = el.target.value;
                        }}
                    ></textarea>
                </div>
                <div className='lastBtns'>
                    <button
                        id='atualizar'
                        onClick={() => {
                            atualizarAtividade(id, status, desc, title, user, admEmail, admData, admHorario);
                        }}
                    >
                        Atualizar
                    </button>

                    <button id='excluir' onClick={() => deleteAtividade(id)}>
                        Excluir Atividade
                    </button>
                </div>
            </div>
        </div>
    );
}
