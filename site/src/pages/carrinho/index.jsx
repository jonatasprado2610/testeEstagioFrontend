import './index.scss';
import Header from '../../components/cabecario';
import CarrinhoItem from '../../components/carrinhoComp';
import Storage from 'local-storage';
import { listarProdutosId } from '../../api/listarProdutos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarrinhoPage() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  async function carregarCarinho() {
    let carrinho = Storage('carrinho') || [];
    let temp = [];

    for (let item of carrinho) {
      const produto = await listarProdutosId(item.id);
      temp.push({
        produto: produto,
        qtd: item.qtd
      });
    }

    setItens(temp);
  }

  function removerItem(id) {
    let carrinho = Storage('carrinho') || [];
    carrinho = carrinho.filter(item => item.id !== id);
    Storage('carrinho', carrinho);

    setItens(itens.filter(item => item.produto.id !== id));
  }

  function atualizarQuantidade(id, novaQtd) {
    const novosItens = itens.map(item => {
      if (item.produto.id === id) {
        return { ...item, qtd: novaQtd };
      }
      return item;
    });

    setItens(novosItens);

    let carrinho = Storage('carrinho') || [];
    carrinho = carrinho.map(item => {
      if (item.id === id) {
        return { ...item, qtd: novaQtd };
      }
      return item;
    });
    Storage('carrinho', carrinho);
  }

  function calcularSubtotal() {
    let total = 0;
    for (let item of itens) {
      total += item.produto.preco * item.qtd;
    }
    return total.toFixed(2).replace('.', ',');
  }

  // Função para tratar o clique no botão finalizar
  function verificar() {
    if (itens.length === 0) {
      alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
      return;
    }
    // Se tiver itens, navega para a página de finalizar
    navigate('/finalizar');
  }

  useEffect(() => {
    carregarCarinho();
  }, []);

  return (
    <main className="carrinho-wrapper">
      <Header />

      <div className="carrinho-main">
        <section className="lista-itens">
          {itens.map((item, index) => (
            <CarrinhoItem
              key={index}
              item={item}
              onRemove={removerItem}
              onChangeQuantidade={atualizarQuantidade}
            />
          ))}
        </section>

        <aside className="resumo-compra">
          <h2>Resumo</h2>
          <p>Total: <strong>R$ {calcularSubtotal()}</strong></p>

          <button className="btn-finalizar" onClick={verificar}  style={{cursor: itens.length === 0 ? 'not-allowed' : 'pointer'}}>
            Finalizar Compra
          </button>
        </aside>
      </div>
    </main>
  );
}
