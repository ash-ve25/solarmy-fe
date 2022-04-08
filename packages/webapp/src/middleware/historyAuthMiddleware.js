import {clearToken, getToken, isTokenValid} from '../utils/token';

export function historyAuthMiddleware(s) {
    if (!isTokenValid(getToken())) {
        clearToken();
        window.location.reload();
    }
}
