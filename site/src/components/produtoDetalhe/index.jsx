import './index.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listarProdutosId } from '../../api/listarProdutos';
import  Storage from 'local-storage'

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produtos, setProdutos] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      const resposta = await listarProdutosId(id);
      setProdutos(resposta);
    }
    carregarDetalhes();
  }, [id]);

  function AdicionarAoCarrinho(){
    let carrinho = [];
    if(Storage('carrinho')){
      carrinho= Storage('carrinho')
    }
    if(!carrinho.find(item => item.id === id)){
      carrinho.push({
        id:id,
        qtd:1
      })
    }
  }

  if (!produtos) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="product-details">
      <div className="image-section">
        <img src={produtos.imagens?.[0]} alt={produtos.nome} />
        <div className="thumbnails">
          {produtos.imagens?.map((img, idx) => (
            <img key={idx} src={img} alt={`thumb ${idx + 1}`} />
          ))}
        </div>
      </div>

      <div className="info-section">
        <h1>{produtos.nome}</h1>
        <p className="price">R$ {produtos.preco?.toFixed(2)}</p>



        <div className="buttons">
          <button className="buy">Adicionar ao carrinho</button>
        </div>

        <div className="description">
          <h3>Descrição</h3>
          <p>{produtos.descricao}</p>
        </div>
      </div>
    </div>
  );
}
