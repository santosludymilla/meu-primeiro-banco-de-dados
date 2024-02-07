import express from "express";
import { db, firestore } from '../banco-de-dados/firebase';

const app = express()

   app.use(express.json())

app.get("/", (req, res) => {
    res.send("bem vindo a minha primeira API");
});

app.post('/usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone
    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuarios'), {
            nome: nome,
            email: email,
            telefone: telefone,
        })
        res.send("Usuario adicionado com sucesso:" + docRef.id);
    } catch (e) {
        console.log(e)

        res.status(500).send(e)
    }
})

app.get('/listarUsuarios', async (req,res)=>{
    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

    const usuarioslista = usuarios.docs.map((doc) => ({
        id: doc.id,
...doc.data(),
    })) 
    res.send(usuarioslista)
    } catch (e) {
        console.log("Erro ao listar usuario: " + e)

        res.status(500).send("Erro ao listar usuarios: " + e) 
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





