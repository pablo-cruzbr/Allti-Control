import { PrismaClient } from "@prisma/client";
import prismaclient from "../../../prisma";

interface statusRequest{
    name: string
}

class ListReparoService{
    async execute(){

        const status = prismaclient.statusReparo.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;

    }

}

export {ListReparoService}