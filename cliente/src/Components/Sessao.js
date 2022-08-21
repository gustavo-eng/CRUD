import { useState } from 'react'
import Botao from './Botao'
import './sessao.css'
import Axios from 'axios';

export default function SessaoInsert(props) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState('');
    const [description, setDescription] = useState('');

    const [productList, setProductList] = useState([]);

    const [newAmount, setNewAmount] = useState(0);

    const getProduct = () => {
        Axios.get("http://localhost:3001/products").then((response) => {
            console.log(response)
            setProductList(response.data); // retorna um Array com os dados da busca 
            console.log(response.data[0].nome)
            console.log(`aqui tem productList [${productList[0]}]`)
            
        })
    }
    // alterou o price
    const updateProductAmount = (id) => {

       Axios.put("http://localhost:3001/update", {quantidade: amount, nome: name, id : id }).then((response) => {
           alert("update")
           console.warn('updated');
           console.log(`aqui ta o nome updated ${name}`)
           setProductList(productList.map((valor) => {
                return valor.id == id ? {
                    id: valor.id, 
                    nome: valor.nome , // a fazer 
                    quantidade: valor.quantidade, // config OK .. 
                    preco: valor.prIco, 
                    detalhes: valor.details, 
                    descricao: valor.description
                }
                 : valor
           }))
           getProduct()

       })
    }

    
    const createProduct = () => {
        console.log(props.name)
        Axios.post("http://localhost:3001/create", {
            nome: name,
            quantidade: amount,
            preco: price,
            detalhes: details,
            descricao: description 
        }).then(() => {
            console.log('Success!!') 
            console.log(props.nome)
            setProductList([ 
                ...productList, 
                {
                    nome: name,
                    quantidade: amount,
                    preco: price,
                    detalhes: details,
                    descricao: description
                }
            ])
        })
    }
    
    
    const addProduct = () => {
        console.log('teste')
    }
    
    const refresh = () =>   window.location.reload();      
    
    
    const deleteProduct = (id) => { 
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setProductList(productList.filter((valor) => {
                return valor.id == id;
            }))
        })
        getProduct()
    }
    return (
        
        <div className="information">
            <button onClick={refresh}
            > Reload </button>
            <label>Product name:</label>
            <input type={"text"} placeholder="nome do produto..." 
                onChange={(event) => {
                    setName(event.target.value)
                    }}
            />
            <label>Amount:</label>
            <input type={"number"} placeholder="Quantidade..."
                onChange={(event) => {
                    setAmount(event.target.value)
                    }}
            />
            <label>Price:</label>
            <input type={"number"} placeholder="Preco..."
                onChange={(event) => {
                    setPrice(event.target.value)
                    }}
            />
            <label>Details:</label>
            <input type={"text"} placeholder="Detalhes do produto..."
                onChange={(event) => {
                    setDetails(event.target.value)
                    }}
            />
            <label>Description:</label>
            <input type={"text"} placeholder="Pode ser para identificar..."
                onChange={(event) => {
                    setDescription(event.target.value)
                    }}  
            />
            <Botao 
                name={name} 
                preco={price} 
                amount={amount} 
                details={details} 
                description={description}
                frase='add product'
                op = "addProduct"
                
            />
            <div className=".sessaoDados">
                    <button className='btn' onClick={getProduct}>  show products </button>
                    {productList.map((valor, key)=> {
                        return(
                            <div className='produtos'>  
                                <h3> {valor.nome} - ID: {valor.id} </h3>
                                <h3>Amount: {valor.quantidade}  </h3>
                                <h3>Price: {valor.preco} R$  </h3>
                                <h3>Detalhes: {valor.detalhes} </h3>
                                <h3>Description: {valor.descricao}  </h3>
                                
                                <div className='updating'>
                                    {" "}
                                    <input type={"number"} placeholder="updating... "
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                                
                                            }}
                                    />
                                    
                                    <br/>
                                    <br/>
                                    <input type={"text"} placeholder="updating... "
                                            onChange={(event) => {
                                                setName(event.target.value)
                                                
                                            }}
                                    />
                                    
                                    <button onClick={() => {updateProductAmount(valor.id)}}  > update </button>
                                    
                                    <button className='deletar'
                                        onClick={() => deleteProduct(valor.id)}
                                    > DELETE </button> 
                                    
                                </div>
                            </div>
                        )
                    })}
                    
            </div>
        </div>

    )
}

