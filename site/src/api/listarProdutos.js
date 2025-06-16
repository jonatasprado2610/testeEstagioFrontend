import axios from 'axios'


const api = axios.create({
    baseURL:'http://localhost:3000'
});

export async function listarProdutosId(id){
   const resp = await api.get(`/produtos/${id}`);
   return resp.data;
}

export async function listarProdutos() {
     const resp = await api.get('/produtos');
     return resp.data;
}

