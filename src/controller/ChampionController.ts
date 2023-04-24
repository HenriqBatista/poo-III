import express, { Request, Response } from 'express'
import { ChampionDataBase } from '../database/ChampionDataBase'
import { ChampionDB } from '../types'
import { Champions } from '../models/Champions'
import { ChampionBusiness } from '../business/ChampionBusiness'


export class ChampionController{
    getChampion = async (req: Request, res: Response) =>{
        try {
            const championBusiness = new ChampionBusiness()
            const output = await championBusiness.getChampion()
            res.status(200).send(output)
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
            const input = {
                id,
                name,
                type,
                role
            }
            const championBusiness = new ChampionBusiness()
            const output = await championBusiness.createChampion(input)
            
            res.status(201).send({message:"Campeão criado com sucesso, Bem-vindo a Summoners Rift.", 
            champion:output})


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
            const championBusiness = new ChampionBusiness()
            const output = await championBusiness.editChampionRole(id, role)

            
        res.status(200).send({message:"Troca de role feita com sucesso", newRole:output})

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
            const championBusiness = new ChampionBusiness()
            const output = await championBusiness.deleteChampion(id)

         res.status(200).send({ message:"Campeão deletado com sucesso.",deleted:output})
            
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