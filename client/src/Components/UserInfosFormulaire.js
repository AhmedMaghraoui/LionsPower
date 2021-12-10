import React from 'react'
import { Form, Alert, Button, Select, InputNumber  } from 'antd'
import {useState,useEffect} from 'react'

const { Option } = Select
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const validateMessages = {
  required: '${label} est requis!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} doit être entre ${min} et ${max}',
  },
};
const UserInfosFormulaire = (props) => {

    const [form] = Form.useForm()
    const [data, setDATA] = useState({
      genre: String,
      age:Number,
      poids: Number,
      taille: Number,
      activite: Number
    })

    const [besoin, setBesoin] = useState()

    const onFinish= async ()=>{
      let TDEE = null
       let BMR = (data.genre === "femme") ? 10* data.poids + 6.25* data.taille - 5*data.age - 161
                                                : 10 * data.poids + 6.25* data.taille - 5*data.age + 5 
            BMR = Math.round(BMR)
            switch(data.activite){
            case 1 :
                TDEE = (BMR * 1.25)
            case 2 :
                TDEE = (BMR * 1.4)
            case 3 :
                TDEE = (BMR * 1.6)
            }
            TDEE = Math.round(TDEE)
            let PROT = Math.round(1.8 * data.poids * 4)
            let LIPIDES = Math.round(data.poids * 9)
            let GLUCIDES = Math.round(TDEE - (PROT + LIPIDES))
            const calories = {BMR, TDEE, PROT,LIPIDES, GLUCIDES}
            setBesoin(calories)
            props.calcCalories(TDEE)
    }
    useEffect(() => {
      if(besoin){
      return () => {
        console.log(besoin)
        props.calcCalories(besoin.TDEE)}
      }
    }, [besoin])
  return (
    <Form {...layout} onFinish={onFinish} form={form} name="control-hooks" validateMessages={validateMessages} >
      <Alert style={{ marginBottom: 18 }}
      /*message="Informational Notes"*/
      description='This calculator uses a standard BMR equation (the Mifflin-St Jeor formula) to estimate your Calorie needs. We also make some rough macronutrient suggestions.Keep in mind that this is a general estimate.'
      type="info"
      showIcon
    />
      <Form.Item
        name="genre"
        label="Genre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={value => setDATA({...data,genre:value})}
          placeholder="Male/Female"
          //onChange={}
          allowClear
        >
          <Option value="femme">female</Option>
          <Option value="homme">male</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {            
            required: true
          },

        ]}
        
        
      >
        <InputNumber min={15} max={60} onChange={value => setDATA({...data,age:value})}/>
      </Form.Item>
      <Form.Item
        name="taille"
        label="Height (cm)"
        rules={[
          {            
            required: true
          },

        ]}
        
        
      >
        <InputNumber min={125} max={220} onChange={value => setDATA({...data,taille:value})}/>
      </Form.Item>
      <Form.Item
        name="poids"
        label="Weight (kg)"
        rules={[
          {            
            required: true
          },

        ]}
        
        
      >
        <InputNumber min={40} max={200} onChange={value => setDATA({...data,poids:value})}/>
      </Form.Item>
      <Form.Item
        name="activite"
        label="Activity"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={value => setDATA({...data,activite:value})}
          placeholder="Activity /week"
          //onChange={}
          allowClear
        >
          <Option value={1}>1 to 3 hours</Option>
          <Option value={2}>4 to 6 hours</Option>
          <Option value={3}> +6 hours</Option>
        </Select>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        
      </Form.Item>
      {besoin ? <Alert
      message="Suggestions:"
      description={`Calories:${besoin.TDEE} || Proteines:${besoin.PROT} || Carbo:${besoin.GLUCIDES} || Fat:${besoin.LIPIDES}`}
      type="success"
      showIcon
    /> : <></>}
    </Form>
    )
}

export default UserInfosFormulaire
