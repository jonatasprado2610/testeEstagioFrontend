import { Link } from 'react-router-dom';
import './index.scss';
import Storage from 'local-storage';

export default function Cardp({ produto }) {

  function adicionarAoCarrinho() {
    let carrinho = Storage('carrinho') || [];

    const existe = carrinho.find(item => item.id === produto.id);

    if (existe) {
      alert(`O produto "${produto.nome}" já está no carrinho.`);
    } else {
      carrinho.push({ id: produto.id, qtd: 1 });
      Storage('carrinho', carrinho);
      alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
    }
  }

  return (
    <div className="card-produto">
      <Link to={`/produto/${produto.id}`} className="link-card">
        <img src={produto.imagens[0]} alt={produto.nome} />
        <div className="info">
          <h2>{produto.nome}</h2>
         
          <strong>R$ {produto.preco.toFixed(2)}</strong>
        </div>
      </Link>
      <button onClick={adicionarAoCarrinho} className="btn-carrinho">Adicionar ao Carrinho</button>
    </div>
  );
}
