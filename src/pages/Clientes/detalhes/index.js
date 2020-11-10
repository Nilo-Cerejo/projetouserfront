import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Clientes extends Component {
    state = {
        clientes: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/clientes/${id}`)
            .then(clientes =>
                clientes.json().then(clientes => this.setState({ clientes }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { clientes, index } = this.state;
 
        if (clientes.ativo) {
            clientes.ativo = "Usuário Ativo";
        } else {
            clientes.ativo = "Usuário Inativo";
        }
 
        return (
            <div className="clientes-info">
                <h1> {clientes.nome} </h1>
                <h1> {clientes.endereço} </h1>
                <h1> {clientes.email} </h1>
                <h1> {clientes.telefone} </h1>
                <br />
                <Link to={`/clientes`}> Voltar </Link> <br />
                <Link to={`/editarClientes/${clientes.id}`}> Editar </Link> <br />
                <Link to={`/deletarClientes/${clientes.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
