import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import DocumentacaoTecnicaList from "./DocumentacaoTecnicaList";
import { DocumentacaoTecnicaProps } from "@/lib/getDocumentacaoTecnica.type";
export const dynamic = 'force-dynamic';
async function getDocumentacaoTecnica():
Promise<DocumentacaoTecnicaProps[]>{
    try{
        const token = await getCookieServer();
        const response = await api.get('/listdocumentacaotecnica',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data || [];
    }catch (err){
        console.error(err);
        return [];
    }
}

export default async function DocumentacaoTecnicaPege(){
    const DocumentacaoTecnica = await getDocumentacaoTecnica();
    return <DocumentacaoTecnicaList DocumentacaoTecnica={DocumentacaoTecnica}
        />

}