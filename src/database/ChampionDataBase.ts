import { ChampionDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class ChampionDataBase extends BaseDatabase{
    public static TABLE_CHAMPIONS = "champions"

    public async findChampions():Promise<ChampionDB[]>{
        const championsDB: ChampionDB[] = await BaseDatabase.connection(ChampionDataBase.TABLE_CHAMPIONS)

        return championsDB
    }

    public async findChampionById(id: string) {
        const [ accountDB ]: ChampionDB[] | undefined[] = await BaseDatabase
            .connection(ChampionDataBase.TABLE_CHAMPIONS)
            .where({ id })

        return accountDB
    }

    public async insertChampion(newChampionDB: ChampionDB){
        await BaseDatabase
        .connection(ChampionDataBase.TABLE_CHAMPIONS)
        .insert(newChampionDB)
    }

    public async updateChampionRole(id:string, newRole:string){
        await BaseDatabase
        .connection(ChampionDataBase.TABLE_CHAMPIONS)
        .update({role: newRole})
        .where({id})
    }

    public async deleteChampion(id:string){
        await BaseDatabase
        .connection(ChampionDataBase.TABLE_CHAMPIONS)
        .del()
        .where({id})
    }
}