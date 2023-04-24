import { ChampionDataBase } from "../database/ChampionDataBase"
import { Champions } from "../models/Champions"
import { ChampionDB } from "../types"

export class ChampionBusiness{
    public getChampion = async ()=>{
        const championDataBase = new ChampionDataBase()
            const championsDB: ChampionDB[] = await championDataBase.findChampions()

            const champions = championsDB.map((championDB)=> new Champions(
                championDB.id,
                championDB.name,
                championDB.type,
                championDB.role,
                championDB.created_at
            ))
            return champions
    }

    public createChampion = async (input:any)=>{
        const {id, name, type, role} = input
        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
        }
        if (typeof type !== "string") {
            throw new Error("'type' deve ser string")
        }
        if (typeof role !== "string") {
            throw new Error("'role' deve ser string")
        }

        const championDataBase = new ChampionDataBase()
        const championDBExists = await championDataBase.findChampionById(id)
        if(championDBExists){
            throw new Error("'id' já existe")
        }

        const newChampion = new Champions(
            id,
            name,
            type,
            role,
            new Date().toISOString()
        )

        const newChampionDB: ChampionDB = {
            id: newChampion.getId(),
            name: newChampion.getName(),
            type: newChampion.getType(),
            role: newChampion.getRole(),
            created_at: newChampion.getCreatedAt()
        }

        

        await championDataBase.insertChampion(newChampionDB)
        return newChampionDB
    }
    
    public editChampionRole = async (id:string, role:string)=>{
        if(typeof role !== "string"){
            throw new Error("'role' deve ser string")
        }
    
    const championDataBase = new ChampionDataBase()
    const championDB = await championDataBase.findChampionById(id)
        if(!championDB){
            throw new Error("Campeão não existe")
        }

        const champion = new Champions(
            championDB.id,
            championDB.name,
            championDB.type,
            championDB.role,
            championDB.created_at
        )

    const newRole = role
    champion.setRole(role)
    const output = newRole
    await championDataBase.updateChampionRole(id, newRole)
    return output 
}

    public deleteChampion = async (id: string)=>{

        const championDataBase = new ChampionDataBase()
            const championDB = await championDataBase.findChampionById(id)
                if(!championDB){
            throw new Error("Campeão não existe")
                }
         await championDataBase.deleteChampion(id)
         return championDB
    }
}