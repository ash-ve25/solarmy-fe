import jwtDecode from 'jwt-decode';

export function parseToken(token) {
    return jwtDecode(token.replace('Bearer ', ''));
}
