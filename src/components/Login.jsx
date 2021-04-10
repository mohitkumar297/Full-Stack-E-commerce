import React from 'react'

function Login() {
    const formStyle = {
        marginTop: 50,
        marginLeft:400,
        marginRight: 400
    }

    return (
        <div style={formStyle}>
            <form method='POST' action='/api/login'>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name='username' className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>
        </div>
    )
}

export default Login
