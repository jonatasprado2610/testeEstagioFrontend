import './index.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">📚 BookStore</Link>
      </div>

      <nav className="menu">
        <Link to="/">Início</Link>
        <Link to="/carrinho">Carrinho</Link>
      </nav>
    </header>
  );
}
