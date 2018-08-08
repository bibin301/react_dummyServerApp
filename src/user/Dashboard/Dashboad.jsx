import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { dashboardList, updateList, deleteList, addEmployeeList } from '../../../services/service/actions';

import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col, Button, Modal, Checkbox, Form, Input, Message } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            tittle: "Dashboard",
            show: false,
            addModel: false,
            empName: '',
            employee: '',
            employeeId: '',
            empID: '',
            id: '',
            formData: {},
            header: "Dashboard",
            submitted: false
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addClose = this.addClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.add = this.add.bind(this);
        this.addRow = this.addRow.bind(this);
        // this.pageReload = this.pageReload.bind(this);


    }
    edit(obj) {

        event.preventDefault();
        this.setState({
            show: true,
            empName: obj.empName,
            empID: obj.empId,
            id: obj.id

        });
    };

    add(event) {
        event.preventDefault();
        this.setState({
            addModel: true
        });
    };

    addRow(event) {
        event.preventDefault();
        let data = {
            "empName": this.state.employee,
            "empId": this.state.employeeId
        };

        console.log("add row =============", data)
        this.props.addEmployeeList(data)
            .then(response => {
                this.props.dashboardList()
                    .then(response => {
                        this.setState({ listData: response.data.data })
                    });
                this.setState({ addModel: false });
                this.setState({ employee: '', employeeId: '' })
            });



    };



    delete(obj) {
        let data = {
            empName: obj.empName,
            empID: obj.empId,
            id: obj.id
        };

        this.props.deleteList(data).then(response => {
            console.log("deletedddkfbdjkf", response)
            this.props.dashboardList()
                .then(response => {
                    this.setState({ listData: response.data.data })
                });
        });
    };

    onSubmit(event) {
        event.preventDefault();
        let data = {
            "empName": this.state.empName,
            "empId": this.state.empID,
            "id": this.state.id
        };
        console.log("submit data", data)
        this.props.updateList(data).then(response => {

            this.props.dashboardList()
                .then(response => {
                    this.setState({ listData: response.data.data })
                });
        });
        this.setState({ show: false });
    };

    handleClose() {
        this.setState({ show: false });
    };


    addClose() {
        this.setState({ addModel: false });
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    };

    componentDidMount() {
        this.props.dashboardList()
            .then(response => {
                this.setState({ listData: response.data.data })
            });
    }
    componentWillReceiveProps(newProps) {
        console.log('t......prop...', this.props, newProps)
    }

    render() {
        console.log('cre...', this.props.credentials.data && this.props.credentials.data.data)

        return (
            <div className="container" style={{ marginTop: '100px' }}>
                <Header headerProp={this.state.header} />
                <span> <button className="btn btn-xs btn-primary" onClick={this.add} type="button">
                    <i className="fa fa-plus-square"></i>
                </button> </span>
                <p className="change_link" style={{ float: 'right' }}>

                    <NavLink to={'/Login'} className="to_register">Log Out</NavLink>
                </p>
                <table id="" className="table table-bordered" role="" >
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee Id</th>
                        <th> Edit </th>
                        {<th> Delete </th>}
                    </tr>
                    <tbody>
                        {
                            this.state.listData.map((utransaction, key) =>
                                <tr key={key}>
                                    <td >{utransaction.empName}</td>
                                    <td>{utransaction.empId}</td>
                                    <td><button className="btn btn-xs btn-primary" onClick={() => this.edit(utransaction)} type="button">
                                        <i className="fa fa-edit"></i>
                                    </button></td>
                                    <td><button className="btn btn-xs btn-primary" onClick={() => this.delete(utransaction)} type="button">
                                        <i className="fa fa-trash-alt"></i>
                                    </button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Employee Name</label>
                                <input type="text" className="form-control" name="empName" onChange={this.handleChange} defaultValue={this.state.empName} id="exampleInputEmail1" placeholder="EmpName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Employee Id</label>
                                <input type="text" className="form-control" name="empID" onChange={this.handleChange} defaultValue={this.state.empID} id="exampleInputPassword1" placeholder="EmpId" />
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success" onClick={this.onSubmit}>Submit</button>
                        <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.addModel} onHide={this.addClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Employee Name</label>
                                <input type="text" className="form-control" name="employee" onChange={this.handleChange} defaultValue={this.state.employee} id="exampleInputEmail1" placeholder="EmpName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Employee Id</label>
                                <input type="text" className="form-control" name="employeeId" onChange={this.handleChange} defaultValue={this.state.employeeId} id="exampleInputPassword1" placeholder="EmpId" />
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success" onClick={this.addRow}>Submit</button>
                        <Button bsStyle="danger" onClick={this.addClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({

    dashboardList: () => dispatch(dashboardList()),
    updateList: credentials => dispatch(updateList(credentials)),
    deleteList: credentials => dispatch(deleteList(credentials)),
    addEmployeeList: credentials => dispatch(addEmployeeList(credentials))
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

