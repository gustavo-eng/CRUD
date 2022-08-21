const express = require('express') // Loading. . . 
const app = express()
const mysql = require('mysql') 
const cors = require('cors');


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'productsystem',  
       
});

app.post("/create", (req, res) => {
    console.log(req.body)
    const nome =  req.body.nome //req.body.name
    const quantidade = req.body.quantidade
    const preco = req.body.preco
    const detalhes = req.body.detalhes
    const descricao = req.body.descricao //req.body.description

    // nomes de parametros que vao dentro de db.query() sao todos aqueles criados no banco de dados mysql 
    db.query("INSERT INTO produtos(nome, quantidade, preco, detalhes, descricao) VALUES (?,?,?,?,?)", 
    [nome, quantidade, preco, detalhes, descricao], 
        (err, result) => {
            if(err) {
                console.error(err)
            } else {    
                res.send("Values inserted")
                console.log('success!!!')
                console.warn(req.body.nome)
                console.log(req.body.descricao)
                console.warn(req.body.quantidade)
                console.log(req.body. detalhes)
                console.warn(req.body.preco)
                
            }
        }
    );

    //INSERT INTO produtos(nome, quantidade, preco, detalhes, descricao) VALUES ('Rafaela', '5', '6', 'amor', 'truuue');
});


app.put('/update', (req, res) => {
    const id = req.body.id
    const quantidade = req.body.quantidade
    const nome = req.body.nome
    db.query(`update produtos set quantidade = ${quantidade}, nome = '${nome}' where id = ${id}`, (err, result) => {
         if(err){
            console.log(err)
         } else {
            console.log(`nome passado pelo udate ${nome}`)
            res.send(result)
         }
    })
})
//UPDATE `productsystem`.`produtos` SET `nome` = 'ediamr', `quantidade` = '95' WHERE (`id` = '1');
//app.delete()


app.get("/products",(req, res) => {
    db.query("SELECT * FROM produtos", (err, result) => {
        
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            
        }
        
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id ;
    db.query(`DELETE FROM produtos WHERE id = ${id}`, (err, result) => { 
        if(err) {
            console.log(err);
            console.log(`<DELETE> conection error -> ${err.message}`);
        } else {
            res.send(result)
        }
    })

})



app.listen(3001, () => { 
    console.log("Server executing in 3001 port")
});








