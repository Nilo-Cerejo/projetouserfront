import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nomeProduto: "",
                preçoCusto: "",
                preçoVenda: "",
                quantidade: ""
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
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produtos: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Casdastro Produtos</legend>
                        <div className="produtos-update">
                            <label htmlFor="nomeProduto">Produto </label>
                            <br />
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                placeholder="NomeProduto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produtos.nomeProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="preçoCusto">Preço Custo</label>
                            <br />
                            <input
                                type="text"
                                id="PreçoCusto"
                                name="PreçoCusto"
                                placeholder="PreçoCusto"
                                required
                                value={this.state.produtos.PreçoCusto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="preçoVenda">Preço Venda </label>
                            <br />
                            <input
                                type="text"
                                id="preçoVenda"
                                name="preçoVenda"
                                placeholder="preçoVenda"
                                required
                                value={this.state.produtos.preçoVenda}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="quantidade">Quantidade</label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="quantidade"
                                required
                                value={this.state.produtos.quantidade}
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
            produtos: { ...prevState.produtos, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produtos;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produtos),
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
 
export default EditarProdutos;
