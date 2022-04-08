import {parseToken} from './parseToken';

export function isTokenValid(token) {
    if (!token) {
        return false;
    }
    
    try {
        const {exp} = parseToken(token);
        
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (exp < currentTime) {
            throw new Error('Token is expired');
        }
        
    } catch (e) {
        return false;
    }
    
    return true;
}
