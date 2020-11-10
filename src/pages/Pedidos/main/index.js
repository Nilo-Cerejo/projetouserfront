import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedidos: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/pedidos`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedidos } = this.state;
 
        return (
            <div className="pedidos-list">
                <br/>
                <Link to={`/criarpedidos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">nomeProduto</th>
                            <th scope="col">quantidade</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedidos, index) => (
                            <tr>
                                <th scope="row">{pedidos.id}</th>
                                <td>{pedidos.nome}</td>
                                <td>{pedidos.telefone}</td>
                                <td>{pedidos.nomeProduto}</td>
                                <td>{pedidos.quantidade}</td>
                                <td> <Link to={`/pedidos/${pedidos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarPedidos/${pedidos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarPedidos/${pedidos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
