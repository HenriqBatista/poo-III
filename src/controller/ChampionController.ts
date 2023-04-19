import express, { Request, Response } from 'express'
import { ChampionDataBase } from '../database/ChampionDataBase'
import { ChampionDB } from '../types'
import { Champions } from '../models/Champions'

export class ChampionController{
    getChampion = async (req: Request, res: Response) =>{
        try {
            const championDataBase = new ChampionDataBase()
            const championsDB: ChampionDB[] = await championDataBase.findChampions()

            const champions = championsDB.map((championDB)=> new Champions(
                championDB.id,
                championDB.name,
                championDB.type,
                championDB.role,
                championDB.created_at
            ))
            res.status(200).send(champions)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    createChampion = async (req: Request, res: Response) =>{
        try {
            const {id, name, type, role } = req.body

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            if (typeof type !== "string") {
                res.status(400)
                throw new Error("'type' deve ser string")
            }
            if (typeof role !== "string") {
                res.status(400)
                throw new Error("'role' deve ser string")
            }

            const championDataBase = new ChampionDataBase()
            const championDBExists = await championDataBase.findChampionById(id)
            if(championDBExists){
                res.status(400)
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
            res.status(201).send(newChampion)


        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    editChampionRole = async (req: Request, res: Response)=>{
        try {
            const id = req.params.id
            const role = req.body.role

            if(typeof role !== "string"){
                res.status(400)
                throw new Error("'role' deve ser string")
            }
        
        const championDataBase = new ChampionDataBase()
        const championDB = await championDataBase.findChampionById(id)
            if(!championDB){
                res.status(400)
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
        await championDataBase.updateChampionRole(id, newRole)

        res.status(200).send({message:"Troca de role feita com sucesso", champion})

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    
    deleteChampion = async (req: Request, res: Response)=>{
        try {
            const id = req.params.id
            const championDataBase = new ChampionDataBase()
            const championDB = await championDataBase.findChampionById(id)
                if(!championDB){
                    res.status(400)
                    throw new Error("Campeão não existe")
                }
         await championDataBase.deleteChampion(id)
         res.status(200).send({ message:"Campeão deletado com sucesso.",championDB})
            
        } catch (error) {
            
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
        
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
        
    }
}