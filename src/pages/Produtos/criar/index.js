import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nomeProduto: "",
                preçoCusto: "",
                preçoVendas: "",
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
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Adicionar Produtos</legend>
                        <div className="produtos-insert">
                            <label htmlFor="nomeProduto">nome </label>
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
                        <div className="produtos-insert">
                            <label htmlFor="preço custo">Preço Custo </label>
                            <br />
                            <input
                                type="text"
                                id="preçoCusto"
                                name="preçoCusto"
                                placeholder="PreçoCusto"
                                required
                                value={this.state.produtos.preçoCusto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="preço Venda">Preço Venda </label>
                            <br />
                            <input
                                type="text"
                                id="preçoVenda"
                                name="preçoVenda"
                                placeholder="PreçoVenda"
                                required
                                value={this.state.produtos.preçoVenda}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="quantidade">Quantidade </label>
                            <br/>
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
                            Cadastrar
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
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/produtos", {
            method: "post",
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
 
export default CriarProdutos;
