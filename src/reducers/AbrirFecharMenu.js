export function AbrirFecharMenu(state = false, action) {
    switch (action.type) {
        case 'ABRIR':
            state = true;
            return state;
        case 'FECHAR':
            state = false;
            return state;
        default:
            return state;
    }
}
