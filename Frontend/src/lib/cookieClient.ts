import {getCookie} from "cookies-next"

export function getCookieClient() {
    const token = getCookie("session");
    return token;
    }


//Quando estivermos num componente server ou client agente usa essa função que vai pegar o token, devolver pra gente ou o token ou vazio