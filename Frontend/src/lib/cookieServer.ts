import {cookies} from 'next/headers'

export async function getCookieServer(){ 
const cookieStore = await cookies();
const token = cookieStore.get("session")?.value;

return token || null;
}


//Quando estivermos num componente server ou client agente usa essa função que vai pegar o token, devolver pra gente ou o token ou vazio