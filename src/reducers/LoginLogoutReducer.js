export function LoginLogoutFunc(state = false, action) {
    switch (action.type) {
        case 'TRUE-FUNC':
            state = true;
            return state;
        case 'FALSE-FUNC':
            state = false;
            return state;
        default:
            return state;
    }
}

export function LoginLogoutAdm(state = false, action) {
    switch (action.type) {
        case 'TRUE-ADM':
            state = true;
            return state;
        case 'FALSE-ADM':
            state = false;
            return state;
        default:
            return state;
    }
}

export function LoggedFuncEmail(state = '', action) {
    switch (action.type) {
        case 'LOGGED-FUNC-EMAIL':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export function LoggedAdmEmail(state = '', action) {
    switch (action.type) {
        case 'LOGGED-ADM-EMAIL':
            state = action.payload;
            return state;
        default:
            return state;
    }
}
