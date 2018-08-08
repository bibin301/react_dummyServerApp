import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { signInUser } from '../../../services/service/actions';
import { Redirect } from 'react-router';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: {
                username: '',
                password: ''
            },
            submitted: false,
            tittle:"dashboard"
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const user = Object.assign({}, this.state.user, { [event.target.name]: event.target.value});
        this.setState({user}); 
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.username == "" && this.state.password ==""){
            return false;
        }else {
            this.setState({ submitted: true });
            const { user } = this.state;
            const data = Object.assign({}, {user});
            this.props.signInUser(data)
            .then(response => {
                console.log("response");
                console.log(response);
                if(response.type == "SIGN_IN_SUCCESS")
                {
                    this.props.history.push('/Dashboard');
                }
            });
        }
        
    }
   render() {
    const { logging  } = this.props;
    const { user, submitted } = this.state;
            return (
           <div className="col-sm-4 col-sm-offset-2" style={{margin:'0 auto' }}>
                <h2 style={{textAlign:'center'}}>Login</h2>    
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="firstName">User Name</label>
                        <input type="text" className="form-control" placeholder="User Name" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">User Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">password</label>
                        <input type="password" className="form-control"  placeholder="Password" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                    </form>
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    signInUser: credentials => dispatch(signInUser(credentials)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Login);