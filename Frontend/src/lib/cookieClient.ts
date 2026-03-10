import { getCookie } from "cookies-next";

export function getCookieClient() {
    const token = getCookie("session") || getCookie("token");

    if (!token) {
        console.warn("getCookieClient: Nenhum cookie de sessão encontrado no navegador!");
    }
    
    return token;
}