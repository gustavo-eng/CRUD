import './botao.css'
import './Sessao'
import React from 'react'
import Axios from 'axios'
import { useState } from 'react'  

export default function Botao(props) {
    
    

    const addProduct = () => {
        console.log(props.name)
        Axios.post("http://localhost:3001/create", {
            nome: props.name,
            quantidade: props.amount,
            preco: props.preco,
            detalhes: props.details,
            descricao: props.description 
        }).then(() => {
            console.log('Success!!') 
            console.log(props.nome)
            
        })
    }

    

    return (
        <div>
            <button onClick={addProduct}> 
                {props.frase}
            </button>
            
        </div>
    ) 
}

/*
{props.op !== 'addProduct' ? 
                <div>{productList.map((val, key) => {
                    return <div> {val.name} </div>
                })}</div>

*/

/*  
{productList.map((val, key) => {
                    return <div> {val.name} </div>
                })}
*/

