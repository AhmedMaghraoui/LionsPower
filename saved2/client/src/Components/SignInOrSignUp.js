import React, { useState, useEffect } from 'react'
import SignIn from './SignIn'
import SignUp from './Signup'
import { Typography, Space } from 'antd';
const { Text, Link } = Typography;


const SignInOrSignUp = () => {
    const [toggle, setToggle] = useState(null)
    
    const changeToggle=()=>{
        setToggle(!toggle)
    }
    return (
        <div>
            {!toggle ? <SignIn/> : <SignUp/>}
            {toggle ? <Text italic>Already have an account ? <a onClick={changeToggle}>Loggin</a></Text> : <Text italic>You don't have an account ? <a onClick={changeToggle}>Sign Up</a></Text>}
        </div>
    )
}

export default SignInOrSignUp
