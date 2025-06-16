import './index.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listarProdutosId } from '../../api/listarProdutos';
import Storage from 'local-storage';
import Header from '../../components/cabecario';  // Importa Header

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produtos, setProdutos] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      const resposta = await listarProdutosId(id);
      setProdutos(resposta);
      setImagemSelecionada(resposta.imagens?.[0]);
    }
    carregarDetalhes();
  }, [id]);

  function AdicionarAoCarrinho(){
    let carrinho = [];
    if(Storage('carrinho')){
      carrinho = Storage('carrinho');
    }
    if(!carrinho.find(item => item.id === id)){
      carrinho.push({ id:id, qtd:1 });
      Storage('carrinho', carrinho);
      alert('Produto adicionado ao carrinho!');
    } else {
      alert('Produto já está no carrinho.');
    }
  }

  if (!produtos) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <main className="detalhe-container">
        <div className="product-details">
          <div className="image-section">
            <img 
              src={imagemSelecionada} 
              alt={produtos.nome} 
              className="imagem-principal"
            />
            <div className="thumbnails">
              {produtos.imagens?.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`thumb ${idx + 1}`}
                  className={imagemSelecionada === img ? 'selecionada' : ''}
                  onClick={() => setImagemSelecionada(img)}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <h1>{produtos.nome}</h1>
            <label>Preço:</label>
            <p className="price">R$ {produtos.preco?.toFixed(2).replace('.', ',')}</p>

            <div className="buttons">
              <button onClick={AdicionarAoCarrinho} className="buy">Adicionar ao carrinho</button>
            </div>

            <div className="description">
              <h3>Descrição</h3>
              <p>{produtos.descricao}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
