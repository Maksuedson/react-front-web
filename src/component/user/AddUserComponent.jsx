import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        ApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Cadastro de Usuário</h2>
                <form>
                <div className="form-group">
                    <label>Usuário:</label>
                    <input type="text" placeholder="usuário" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" placeholder="senha" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Nome:</label>
                    <input placeholder="Nome" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Sobre nome:</label>
                    <input placeholder="Sobre nome" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Idade:</label>
                    <input type="number" placeholder="idade" name="age" className="form-control" value={this.state.age} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Salário:</label>
                    <input type="number" placeholder="salário" name="salary" className="form-control" value={this.state.salary} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveUser}>Salvar</button>
            </form>
    </div>
        );
    }
}

export default AddUserComponent;