import React from 'react'

function Signup() {

    const formStyle = {
        marginTop: 50,
        marginLeft:400,
        marginRight: 400
    }

    return (
        <div style={formStyle}>
            <form method='POST' action='/api/signup'>
                <h3>Sign Up</h3>
{/* 
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name='fName' placeholder="First name" required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" name='lName' placeholder="Last name" required/>
                </div> */}

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name='username' placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name='password' placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>
    )
}

export default Signup
