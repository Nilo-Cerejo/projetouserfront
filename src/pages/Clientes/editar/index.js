import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarClientes extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            clientes: {
                nome: "",
                endereço: "",
                email: "",
                telefone: ""
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
 
        fetch(`http://localhost:3003/sistema/clientes/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ clientes: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/clientes" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="clientes-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.clientes.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="clientes-update">
                            <label htmlFor="endereço">Endereço</label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                required
                                value={this.state.clientes.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="clientes-update">
                            <label htmlFor="email">Email </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                required
                                value={this.state.clientes.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="clientes-update">
                            <label htmlFor="telefone">telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                required
                                value={this.state.clientes.telefone}
                                onChange={this.handleInputChange}
                            /> 

                        </div>

 
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
            clientes: { ...prevState.clientes, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.clientes;
 
        fetch(`http://localhost:3003/sistema/clientes/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.clientes),
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
 
export default EditarClientes;
