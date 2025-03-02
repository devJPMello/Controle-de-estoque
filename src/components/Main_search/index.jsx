import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MainSearch() {
    const { search } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api-estoque-rh46.onrender.com/search/${search}`)
            .then((res) => {
                setProdutos(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setLoading(false);
            });
    }, [search]);

    const Quantidade = ({ qtdeProduto }) => {
        let qtdeProdutos = qtdeProduto.quantidade;
        let statusText = '';
        let statusStyle = {};

        if (qtdeProdutos === 0) {
            statusText = 'Sem estoque';
            statusStyle = { color: '#ac0000' };
        } else if (qtdeProdutos <= 25) {
            statusText = 'Estoque baixo';
            statusStyle = { color: '#f00' };
        } else if (qtdeProdutos <= 50) {
            statusText = 'Estoque moderado';
            statusStyle = { color: '#f3f300' };
        } else {
            statusText = 'Estoque cheio';
            statusStyle = { color: '#03d003', fontWeight: 'bold' };
        }

        return (
            <h4 style={statusStyle}><span>{statusText}</span></h4>
        );
    };

    return (
        <main>
            <article>
                <h1>
                    Procurando por:
                    <span> {search || "All Products"}</span>
                </h1>
            </article>

            {loading && <h1 className="loading-text">Loading...</h1>}

            {!loading && produtos.length === 0 && (
                <h2>Nenhum produto encontrado</h2>
            )}

            {!loading && produtos.length > 0 && (
                <div className="products-container">
                    {produtos.map(produto => (
                        <div key={produto._id} className="product-card">
                            <div className="product-image-container">
                                <img className="img-preview" src={produto.imagem} alt={produto.nome || "Product image"} />
                            </div>
                            <div className="product-info">
                                <h2><a href={`/product/${produto._id}`}>{produto.nome}</a></h2>
                                <p><strong>SKU:</strong> {produto.sku}</p>
                                <p><strong>Marca:</strong> {produto.marca}</p>
                                <p><strong>Estoque atual:</strong> {produto.quantidade}</p>
                                <p><strong>Situação do estoque:</strong> <Quantidade qtdeProduto={produto} /></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}