export interface ComprasProps{
    id: string;
    itemSolicitado: string;
    solicitante: string;
	motivoDaSolicitacao: string;
	preco: string;
	linkDeCompra: string;
	statusCompras: {name: string} | string;
     created_at?: string; 
}

export interface ComprasResponse{
    controles: ComprasProps[];
    total: number;
    totalAguardandoCompra: number;
    totalAguardandoEntrega: number;
    totalCompraFinalizada: number;
}