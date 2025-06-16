import { useState } from 'react';
import './index.scss';

export default function CarrinhoItem(props) {
  const [qtd, setQtd] = useState(props.item.qtd || 1);

  function calcularSubTotal() {
    const subtotal = qtd * props.item.produto.preco;
    return subtotal.toFixed(2).replace('.', ',');
  }

  function removerItem() {
    if (props.onRemove) {
      props.onRemove(props.item.produto.id);
    }
  }

  function alterarQuantidade(e) {
    const novaQtd = Number(e.target.value);
    if (novaQtd >= 1) {
      setQtd(novaQtd);

      if (props.onChangeQuantidade) {
        props.onChangeQuantidade(props.item.produto.id, novaQtd);
      }
    }
  }

  return (
    <div className="carrinho-container">
      <div className="imagem">
        <img src={props.item.produto.imagens[0]} alt="Produto" />
      </div>

      <div className="info">
        <h3 title={props.item.produto.nome}>{props.item.produto.nome}</h3>

        <div className="quantidade">
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            value={qtd}
            onChange={alterarQuantidade}
          />
        </div>

        <div className="valores">
          <div>
            <span>Valor unitário</span>
            <strong>R$ {props.item.produto.preco.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div>
            <span>Valor total</span>
            <strong>R$ {calcularSubTotal()}</strong>
          </div>
        </div>
      </div>

      <button className="remover" onClick={removerItem}>🗑</button>
    </div>
  );
}
