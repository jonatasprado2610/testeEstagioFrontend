import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cardp from '../../components/cardproduto';
import { listarProdutos } from '../../api/listarProdutos';
import Header from '../../components/cabecario';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 20
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 10
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
};

export default function CarrosselProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const resposta = await listarProdutos();
      setProdutos(resposta);
    }
    carregar();
  }, []);

  return (
    <main>
        <Header/>
       <div style={{ margin: '2rem' }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay={false}
        keyBoardControl={true}
        itemClass="carousel-item-padding"
        containerClass="carousel-container"
      >
        {produtos.map((produto) => (
          <Cardp key={produto.id} produto={produto} />
        ))}
      </Carousel>
    </div> 
    </main>
    
  );
}
