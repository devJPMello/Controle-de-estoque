import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";
import { useNavigate } from 'react-router-dom';

export default function AddNew() {
    const navigate = useNavigate(); 

    const [produto, setProduto] = useState({
        nome: '',
        sku: '',
        descricao: '',
        quantidade: '',
        marca: '',
        preco: '',
        cor: '',
        imagem: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!produto.nome || !produto.sku || !produto.descricao || !produto.quantidade || !produto.marca || !produto.preco || !produto.cor || !produto.imagem) {

            const camposFaltando = Object.keys(produto).find(key => !produto[key]);
            alert(`Por favor, preencha o campo "${camposFaltando}"!`);

            return;
        }
        try {
            const response = await axios.post('https://api-estoque-rh46.onrender.com/', produto); // criando o post pelo axios
            console.log('Produto adicionado:', response.data);

            setProduto({
                nome: '',
                sku: '',
                descricao: '',
                quantidade: '',
                marca: '',
                preco: '',
                cor: '',
                imagem: ''
            });

            navigate('/'); 
        } catch (error) {
            alert('Erro ao adicionar produto:', error, '. Tente novamente');

            return;
        }
    };

    return (
        <section className="section-addProd">
            <article className="title">
                <div className="div-input">
                    <label htmlFor="name">Nome :</label>
                    <input className="add-input" type="text" name="nome" value={produto.nome}
                        onChange={handleChange} placeholder="Digite o nome do produto" required />
                </div>
                <div className="div-input">
                    <label className="sku-label" htmlFor="sku">SKU :</label>
                    <input className="sku-input" type="text" name="sku" value={produto.sku}
                        onChange={handleChange} placeholder="Digite o SKU do produto" required />
                </div>
            </article>
            <section>
                <article className="banner-stock">
                    <div className="product-img">
                        <img width="50px" height="50px" src="/assets/upload_icon.svg" alt="imagem icon de upload" />
                        <input className="add-input-upload" type="text" name="imagem" value={produto.imagem} 
                        onChange={handleChange} placeholder="Cole aqui o URL da imagem" required />
                    </div>
                    <div className="area-stock">
                        <div className="bar-code">
                            <img src="/assets/codigo-de-barras.svg" alt="codigo-de-barras" />
                        </div>
                        <div className="stock-card">
                            <div className="title-stock">
                                <h2>Estoque</h2>
                            </div>
                            <div className="data-stock">
                                <h3>ESTOQUE ATUAL</h3>
                                <div className="div-stock-input">
                                    <label htmlFor="estoque">Estoque:</label>
                                    <input className="add-input" type="number" name="quantidade" value={produto.quantidade}
                                        onChange={handleChange} placeholder="Digite o estoque" required />
                                </div>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-add" onClick={handleSubmit}>Adicionar Produto</button>
                        </div>
                    </div>
                </article>

                <article className="input-list">
                    <ul className="list-product">
                        <div className="div-input-list">
                            <label htmlFor="custo">Valor:</label>
                            <input className="add-input" type="number" name="preco" value={produto.preco}
                                onChange={handleChange} placeholder="Digite o valor" required />
                        </div>
                        <div className="div-input-list">
                            <label htmlFor="color">Cor :</label>
                            <input className="add-input" type="text" name="cor" value={produto.cor}
                                onChange={handleChange} placeholder="Digite a cor do produto" required />
                        </div>
                        <div className="div-input-list">
                            <label htmlFor="marca">Marca :</label>
                            <input className="add-input" type="text" name="marca" value={produto.marca}
                                onChange={handleChange} placeholder="Digite a marca" required />
                        </div>
                        <div className="div-input-list">
                            <label htmlFor="descricao">Descrição :</label>
                            <input className="add-input" type="text" name="descricao" value={produto.descricao}
                                onChange={handleChange} placeholder="Digite uma descrição" required />
                        </div>
                    </ul>
                </article>
            </section>
        </section>
    );
}
