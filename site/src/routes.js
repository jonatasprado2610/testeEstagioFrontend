import { BrowserRouter, Routes, Route } from 'react-router-dom'


import ListarProdutos from './pages/listarProdutos'
import DetalhesProdutos from './pages/detalhesProdutos'
import Carrinho from './pages/carrinho'
import Finalizar from './pages/finalizar'


export default function Index() {
    return (<BrowserRouter>
        <Routes>
            <Route path='/' element={<ListarProdutos />} />
            <Route path='/produto/:id' element={<DetalhesProdutos />} />
            <Route path='/carrinho' element={<Carrinho />} />
            <Route path='/finalizar' element={<Finalizar />} />
        </Routes>
    </BrowserRouter>)

}