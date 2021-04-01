import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data.result;
                this.setState({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                salary: user.salary,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        ApiService.editUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Editar usuário</h2>
                <form>

                    <div className="form-group">
                        <label>Usuário:</label>
                        <input type="text" placeholder="usuário" name="username" className="form-control" readonly="true" defaultValue={this.state.username}/>
                    </div>

                    <div className="form-group">
                        <label>Nome:</label>
                        <input placeholder="nome" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Sobre Nome:</label>
                        <input placeholder="sobre nome" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Idade:</label>
                        <input type="number" placeholder="idade" name="age" className="form-control" value={this.state.age} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Salário:</label>
                        <input type="number" placeholder="salário" name="salary" className="form-control" value={this.state.salary} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditUserComponent;