import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [state,setState] = useState({
        userName : '',
        email : '',
        password : '',
        confirmPassword : '',
        image : '' 
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }   

  return (
    <div className="register">
        <div className="card">
            <div className="card-header">
                <h3>Register</h3>

            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" onChange={inputHandle} name="userName" value={state.userName} className="form-control" placeholder="UserName" id="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={inputHandle} name="email" value={state.email} className="form-control" placeholder="Email" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={inputHandle} name="password" value={state.password} className="form-control" placeholder="Password" id="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" onChange={inputHandle} name="confirmPassword" value={state.confirmPassword} className="form-control" placeholder="ConfirmPassword" id="confirmPassword"/>
                    </div>
                    
                    <div className="form-group">
                        <div className="file-image">
                            <div className="image">

                            </div>
                            <div className="file">
                                <label htmlFor="image">Select Image</label>
                                <input type="file" name="image" className="form-control" id="image" />
                            </div>
                        </div>                            
                    </div>

                    <div className="form-group">
                        <input type="submit" value="register" className="btn" />
                    </div>
                    <div className="form-group">
                        <span >
                            <Link to="/messenger/login">Login Your Account</Link>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    </div> 
  )
}

export default Register