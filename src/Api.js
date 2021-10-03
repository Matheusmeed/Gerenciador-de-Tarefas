import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './firebase/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const dbFirestore = db;

const Api = {
    createUserWithEmailAndPassword: async (email, password) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                alert('Conta criada com sucesso!');
                // ...
            })
            .catch((error) => {
                alert(error);
            });
    },
    actionLogin: (email, password) =>
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                return userCredential.user;
                // ...
            })
            .catch(() => {
                return null;
            }),
    addDocument: (title, status, desc, user, userEmail, data, horario) => {
        db.collection('atividades')
            .add({
                title: title,
                status: status,
                desc: desc,
                user: user,
                userEmail: userEmail,
                data: data,
                horario: horario,
                id: Math.random() + title,
                admEmails: [],
                admDatas: [],
                admHorarios: [],
            })
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    },
    getAtividades: (_checked) =>
        db
            .collection('atividades')
            .get()
            .then((atividades) => {
                let _atividades = [];
                let checkedStatus;
                switch (_checked) {
                    case 'tudo':
                        checkedStatus = 'tudo';
                        break;
                    case 'pendente':
                        checkedStatus = 'Pendente';
                        break;
                    case 'andamento':
                        checkedStatus = 'Em andamento';
                        break;
                    case 'finalizada':
                        checkedStatus = 'Finalizada';
                        break;
                    case 'cancelada':
                        checkedStatus = 'Cancelada';
                        break;

                    default:
                        checkedStatus = _checked;
                        break;
                }
                if (checkedStatus === 'tudo') {
                    atividades.forEach((atividade) => {
                        _atividades.push(atividade.data());
                    });
                } else if (checkedStatus === _checked) {
                    atividades.forEach((atividade) => {
                        if (
                            atividade.data().title.toUpperCase().includes(checkedStatus.toUpperCase()) ||
                            atividade.data().desc.toUpperCase().includes(checkedStatus.toUpperCase()) ||
                            atividade.data().user.toUpperCase().includes(checkedStatus.toUpperCase())
                        ) {
                            _atividades.push(atividade.data());
                        }
                    });
                } else {
                    atividades.forEach((atividade) => {
                        if (atividade.data().status === checkedStatus) {
                            _atividades.push(atividade.data());
                        }
                    });
                }

                return _atividades;
            }),
    updateAtividades: async (id, status, desc, title, user, admEmail, admData, admHorario) =>
        db
            .collection('atividades')
            .get()
            .then((atividade) => {
                let _docRefId;
                let _admEmails;
                let _admDatas;
                let _admHorarios;
                atividade.forEach((atv) => {
                    if (atv.data().id === id) {
                        _docRefId = atv.id;
                        _admEmails = atv.data().admEmails;
                        _admDatas = atv.data().admDatas;
                        _admHorarios = atv.data().admHorarios;
                    }
                });
                return [_docRefId, _admEmails, _admDatas, _admHorarios];
            })
            .then((doc) => {
                console.log(doc);
                db.collection('atividades')
                    .doc(doc[0])
                    .update({
                        user: user,
                        desc: desc,
                        status: status,
                        title: title,
                        id: id,
                        admEmails: [...doc[1], admEmail],
                        admDatas: [...doc[2], admData],
                        admHorarios: [...doc[3], admHorario],
                    });
            }),
    deleteAtividade: (id) => {
        db.collection('atividades')
            .get()
            .then((atividade) => {
                let docRefId;
                atividade.forEach((atv) => {
                    if (atv.data().id === id) {
                        docRefId = atv.id;
                    }
                });
                return docRefId;
            })
            .then((doc) => {
                db.collection('atividades')
                    .doc(doc)
                    .delete()
                    .then(() => {
                        console.log('Document successfully deleted!');
                    })
                    .catch((error) => {
                        console.error('Error removing document: ', error);
                    });
            });
    },
};

export default Api;
