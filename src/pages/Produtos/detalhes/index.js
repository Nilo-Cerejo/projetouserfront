import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produtos extends Component {
    state = {
        produtos: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produtos, index } = this.state;
 
        if (produtos.ativo) {
            produtos.ativo = "Usuário Ativo";
        } else {
            produtos.ativo = "Usuário Inativo";
        }
 
        return (
            <div className="produtos-info">
                <h1> {produtos.nomeProduto} </h1>
                <h1> {produtos.preçoCusto} </h1>
                <h1> {produtos.preçoVenda} </h1>
                <h1> {produtos.quantidade} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProdutos/${produtos.id}`}> Editar </Link> <br />
                <Link to={`/deletarProdutos/${produtos.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
