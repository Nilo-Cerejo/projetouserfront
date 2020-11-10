import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainClientes from './pages/Clientes/main';
import DetalhesClientes from './pages/Clientes/detalhes';
import CriarClientes from './pages/Clientes/criar';
import EditarClientes from './pages/Clientes/editar';
import DeletarClientes from './pages/Clientes/deletar';

import MainProdutos from './pages/Produtos/main';
import DetalhesProdutos from './pages/Produtos/detalhes';
import CriarProdutos from './pages/Produtos/criar';
import EditarProdutos from './pages/Produtos/editar';
import DeletarProdutos from './pages/Produtos/deletar';

import MainPedidos from './pages/Pedidos/main';
import DetalhesPedidos from './pages/Pedidos/detalhes';
import CriarPedidos from './pages/Pedidos/criar';
import EditarPedidos from './pages/Pedidos/editar';
import DeletarPedidos from './pages/Pedidos/deletar';

 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/clientes" component={MainClientes} />
            <Route path="/clientes/:id" component={DetalhesClientes} />
            <Route path="/criarclientes" component={CriarClientes} />
            <Route path="/editarclientes/:id" component={EditarClientes} />
            <Route path="/deletarclientes/:id" component={DeletarClientes} />

            <Route exact path="/produtos" component={MainProdutos} />
            <Route path="/produtos/:id" component={DetalhesProdutos} />
            <Route path="/criarprodutos" component={CriarProdutos} />
            <Route path="/editarprodutos/:id" component={EditarProdutos} />
            <Route path="/deletarprodutos/:id" component={DeletarProdutos} />
            
            <Route exact path="/pedidos" component={MainPedidos} />
            <Route path="/pedidos/:id" component={DetalhesPedidos} />
            <Route path="/criarpedidos" component={CriarPedidos} />
            <Route path="/editarpedidos/:id" component={EditarPedidos} />
            <Route path="/deletarpedidos/:id" component={DeletarPedidos} />

        </Switch>
    </BrowserRouter>
)
 
export default Routes;