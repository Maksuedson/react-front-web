import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data})
            });
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'Usuário deletado com sucesso!'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })

    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Lista de Usuários</h2>
                <button className="btn btn-success" style={{width:'150px'}} onClick={() => this.addUser()}>Cadastrar Usuário</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Nome</th>
                            <th>Sobre Nome</th>
                            <th>Usuário</th>
                            <th>Idade</th>
                            <th>Salário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                        user =>
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.age}</td>
                                        <td>{user.salary}</td>
                                        <td>
                                            <button className="btn btn=warning" onClick={() => this.editUser(user.id)}> <i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-danger ml-2" onClick={() => this.deleteUser(user.id)}style={{marginLeft: '1px'}}> <i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListUserComponent;