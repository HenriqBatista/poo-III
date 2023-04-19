import express, { Request, Response } from 'express'
import cors from 'cors'
import { ChampionController } from './controller/ChampionController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!!!" })
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
})

const championController = new ChampionController()

app.get("/champions", championController.getChampion)
app.post("/champions", championController.createChampion)
app.put("/champions/:id/role",championController.editChampionRole)
app.delete("/champions/:id", championController.deleteChampion)