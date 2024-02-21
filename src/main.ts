import express from "express";
import { db, firestore } from '../banco-de-dados/firebase';

const app = express()

   app.use(express.json())

app.get("/", (req, res) => {
    res.send("bem vindo a minha primeira API");
});

app.post('/formulario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email
    const nivelEscolaridade = req.body.nivelEscolaridade
    const curso = req.body.curso
    const horario = req.body.horario
    const descricao = req.body.descricao



    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'), {
            nome: nome,
            email: email,
            nivelEscolaridade: nivelEscolaridade,
            curso: curso,
            horario: horario,
            descricao: descricao,


        })
        res.send("Formulario cadastrado com sucesso:" + docRef.id);
    } catch (e) {
        console.log(e)

        res.status(500).send(e)
    }
})

app.get('/listarFormulario', async (req,res)=>{
    try {
        const formularios = await firestore.getDocs(firestore.collection(db, 'formulario'))

    const formularioLista = formularios.docs.map((doc) => ({
        id: doc.id,
...doc.data(),
    })) 
    res.send(formularioLista)
    } catch (e) {
        console.log("Erro ao listar formularios: " + e)

        res.status(500).send("Erro ao listar formularios: " + e) 
    } 
})

app.put('/atualizarUsuario/:id',async (req, res) => { 
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db,'usuarios', id),{
            nome: nome,
        })
        res.send('usuario atualizado com sucesso!')
    } catch (e) {
      console.log('Erro ao localizar usuario: ' + e)

      res.status(500).send('Erro ao atualizar ao usuario: ' + e)
        }
});

app.delete('/deletarUsuario/:id', async(req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db,'usuarios',id))

        res.send('Usuario deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar usuario:' + e)
         
    res.status(500).send('Erro ao deletar usuario:' + e)
    }
})

app.listen(3000, function () {
    console.log("serviço rodando em http://localhost:3000")
});


