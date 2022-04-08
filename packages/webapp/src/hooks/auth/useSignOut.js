import {clearToken} from "../../utils/token";

export function useSignOut() {
    return () => {
        clearToken();
        
        window.location.href = '/';
    }
}
