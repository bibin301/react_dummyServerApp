import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser ,updateUser} from '../services/session/actions';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import {  Grid, Row, Col,  Modal,Checkbox, Form, Input, Message } from 'react-bootstrap';
class User extends Component {
    constructor(props) {
        super(props);
        this.state ={
          data:this.props.credentials.data,
          show: false,
          user: {
            firstName : '',
            lastName  : ''
          },
          formData: {},
          submitted: false
        };


        this.edit      = this.edit.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.cancel    = this.cancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
 
    /*handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        console.log('change',this.state.name)
    }
    onSubmit(event) {
        event.preventDefault();
        console.log('submit',this.state.name)
        const { email,password, name, users } = this.state;
        const data = Object.assign({}, {email, password, name});
        this.props.signUpUser(data);
    } */
    edit(data)
    {
      console.log("data");
      console.log(data);
      data.user.id = data.id;
      this.setState({
            show: true,
            user:data.user
        });
        console.log("this.state.value");
        console.log(this.state.value);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const user = Object.assign({}, this.state.user, { [event.target.name]: event.target.value});
        this.setState({user}); 
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const data = Object.assign({}, {user});
        this.props.updateUser(data).then(response => {
            console.log("signupresponse");
            console.log(response);
        }); 
        
    }
    render() {
      const { user, submitted } = this.state;
      return (
        <div>
         
           <table>
              <tbody>
                {
                  this.state.data.data.map((person, i) =>
                    <TableRow key = {i}
                      index = {i}
                      edit={this.edit}
                      show={this.state.show}
                      formData={this.state.formData}
                      hideModal={this.hideModal}
                      data = {person} />
                  )}
              </tbody>
           </table>
           <Modal show={this.state.show} onHide={this.hideModal} aria-labelledby='ModalHeader'>
            <Modal.Header >
            <Modal.Title id='ModalHeader'>Update user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
              {submitted && !user.firstName &&
                  <div className="help-block">First Name is required</div>
              }
          </div>
          <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
              {submitted && !user.lastName &&
                  <div className="help-block">Last Name is required</div>
              }
          </div>
          <div className="form-group">
              <button className="btn btn-primary" type="submit">Update</button>
          </div>
          </form>
            </Modal.Body>
            <Modal.Footer>
           <button className='btn btn-primary' onClick={this.update}>Update</button>
            <button className='btn btn-danger' onClick={this.cancel}>Cancel</button>
            </Modal.Footer>
      </Modal>

      </div>
      );
   }
   hideModal(){
    this.setState({
      show: false
    })
  }
}
class TableRow extends React.Component {

    constructor(props)
    {
        super(props);
        this.delete = this.delete.bind(this);

    }
    delete(id,data)
    {
        console.log("id");
        console.log(id);
        console.log(data);
        var contacts = [...this.state.contacts];
        contacts.splice(index, 1);
        this.setState({contacts});
    }
    render() {
      const {formData} = this.props;
      
       return (
        <tr className="App">
            <td>{this.props.index}</td>
             <td>{this.props.data.user.firstName}</td>
             <td>{this.props.data.user.lastName}</td>
             <td><button onClick={() => this.props.edit(this.props.data)}>Edit</button></td>
             <td><button onClick = {() => this.delete(this.props.index,this.props.data)}>Delete</button></td>
          </tr>
       );
    }
  }
  const mapStateToProps = (state, ownProps) => ({
    credentials: state.session.credentials,
  });
  const mapDispatchToProps = dispatch => ({
    signInUser: credentials => dispatch(signInUser(credentials)),
    updateUser: credentials => dispatch(updateUser(credentials))

  });
export default connect(mapStateToProps, mapDispatchToProps)(User);
    
  