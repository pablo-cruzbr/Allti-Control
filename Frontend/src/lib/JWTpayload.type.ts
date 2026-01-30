export interface JwtPayload {
  sub: string;       
  name: string;
  email: string;
  iat: number;
  exp: number;

   instituicaoUnidade: {
        name: string; 
        endereco: string;
    };

     cliente: {
        name: string;
        endereco: string;
    };
    
    setor:{
        name: string
    }
}
