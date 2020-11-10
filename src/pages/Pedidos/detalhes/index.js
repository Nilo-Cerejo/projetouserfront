import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Pedidos extends Component {
    state = {
        pedidos: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedidos, index } = this.state;
 
        if (pedidos.ativo) {
            pedidos.ativo = "Usuário Ativo";
        } else {
            pedidos.ativo = "Usuário Inativo";
        }
 
        return (
            <div className="pedidos-info">
                <h1> {pedidos.nome} </h1>
                <h1> {pedidos.telefone} </h1>
                <h1> {pedidos.nomeProduto} </h1>
                <h1> {pedidos.quantidade} </h1>
                
                <br />
                <Link to={`/pedidos`}> Voltar </Link> <br />
                <Link to={`/editarPedidos/${pedidos.id}`}> Editar </Link> <br />
                <Link to={`/deletarPedidos/${pedidos.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
