import './index.scss';
import Storage from 'local-storage';
import Header from '../../components/cabecario';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarProdutosId } from '../../api/listarProdutos';

export default function FinalizarCompra() {
    const [itens, setItens] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [cartao, setCartao] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarCarrinho() {
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

        carregarCarrinho();
    }, []);

    function calcularSubtotal() {
        let total = 0;
        for (let item of itens) {
            total += item.produto.preco * item.qtd;
        }
        return total.toFixed(2).replace('.', ',');
    }

    function finalizarCompra() {
        if (!endereco || !numero || !cep || !cartao || !cpf || !codigo) {
            alert('Preencha todos os dados para finalizar.');
            return;
        }

        Storage('carrinho', []);
        alert('Compra finalizada com sucesso!');
        navigate('/');
    }

    return (
        <div className="finalizar-wrapper">
            <Header />
            <main className="finalizar-container">
                
                {/* Resumo da compra VEM PRIMEIRO */}
                <aside className="card-resumo">
                    <h2>Resumo da Compra</h2>
                    <ul>
                        {itens.map((item, idx) => (
                            <li key={idx}>
                                {item.qtd}x {item.produto.nome} - R${(item.qtd * item.produto.preco).toFixed(2).replace('.', ',')}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total:</strong> R$ {calcularSubtotal()}</p>
                </aside>

                {/* Card de Endereço */}
                <section className="card-endereco">
                    <h2>Endereço de Entrega</h2>
                    <input type="text" placeholder="Rua, Av, etc..." value={endereco} onChange={e => setEndereco(e.target.value)} />
                    <input type="text" placeholder="Número" value={numero} onChange={e => setNumero(e.target.value)} />
                    <input type="text" placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)} />
                </section>

                {/* Card de Pagamento */}
                <section className="card-pagamento">
                    <h2>Dados do Cartão</h2>
                    <input type="text" placeholder="Número do Cartão" value={cartao} onChange={e => setCartao(e.target.value)} />
                    <input type="text" placeholder="CPF do Titular" value={cpf} onChange={e => setCpf(e.target.value)} />
                    <input type="text" placeholder="Código de Segurança" value={codigo} onChange={e => setCodigo(e.target.value)} />
                    <button onClick={finalizarCompra}>Finalizar Compra</button>
                </section>
            </main>
        </div>
    );
}
