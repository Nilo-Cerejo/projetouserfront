import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarPedidos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedidos: {
                nome: "",
                telefone: "",
                nomeProduto: "",
                quantidade: "",
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ pedidos: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="pedidos-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedidos.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="pedidos-update">
                            <label htmlFor="telefone">telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                required
                                value={this.state.pedidos.telefone}
                                onChange={this.handleInputChange}
                            /> 

                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="nomeProduto">Produto</label>
                            <br />
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                placeholder="nomeProduto"
                                required
                                value={this.state.pedidos.nomeProduto}
                                onChange={this.handleInputChange}
                            /> 

                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="quantidade">Quantidade</label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="quantidade"
                                required
                                value={this.state.pedidos.quantidade}
                                onChange={this.handleInputChange}
                            /> 

                        </div>
                        <br/>

 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
                    
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            pedidos: { ...prevState.pedidos, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.pedidos;
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.pedidos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default EditarPedidos;
