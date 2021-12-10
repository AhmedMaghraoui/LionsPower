import React from 'react'
import { Form, Input, Button, Checkbox ,Alert} from 'antd'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { useState, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'



const SignUp = () => {
    const navigate = useNavigate()
    const {globalState, setGlobalState} = React.useContext(GlobalContext)

    const [err, setErr] = useState(null)

    useEffect(() => {
      const token = globalState.token
      if (token) {
        navigate('/')
      }
      
    }, [err])

    const onFinish = async (values) => {
        console.log('Success:', values);
        await axios.post('/api/signup', values)
              .then(response=>{
                if (response.status === 200) {
                    setErr({message:"success",description:'successfully logged in'})
                    navigate('/signin')
                  } else {console.log('lé')}
              })
              //console.log(response))
              //.then(navigate("/signin"))
              .catch(err=>setErr({message:"error",description:'Please Try Again !'}))
        //const json = await data.json()
        //console.log(json)
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    <Form.Item name='name' label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true,type: "email", message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          SignUp
        </Button>
      </Form.Item>
      {err ? <Alert
      message={err.message}
      description={err.description}
      type={err.message}
      showIcon
      /> : null}
    </Form>

    )
}

export default SignUp
