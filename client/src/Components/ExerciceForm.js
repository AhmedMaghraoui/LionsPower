import React, {useState,useEffect} from 'react'
import { Form, Input, Button, Space ,InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router'
import UploadImage from './UploadImage';
import axios from 'axios';
import { GlobalContext } from './GlobalContext';

const ExerciceForm = () => {
  const {globalState, setGlobalState} = React.useContext(GlobalContext)
  const { id } = useParams()
    let [pic,setPic]=useState(null)
      function addPic(pic){
        setPic({pic})
      }
      useEffect(() => {
        
      }, [])
      const onFinish = async (values) => {
        //console.log('Received values of form:', values.exercices[0].exercice)
        values.exercices.forEach(async value=>{
           await axios.patch(`http://localhost:5000/api/addexercices/${id}`, {Name:value.exercice,Description:value.description,pic:value.exercice+'.png'})
                      .then(response=>console.log(response.status))
          
          }
          )
      }

     
    
      return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <Form.List name="exercices">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'exercice']}
                      fieldKey={[fieldKey, 'exercice']}
                      rules={[{ required: true, message: 'Missing exercice' }]}
                    >
                      <Input placeholder="Exercice"/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'Missing description' }]}
                    >
                      <Input placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                    >
                      <UploadImage/>
                    </Form.Item>
                   
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    {console.log('test'+{...restField})}
                  </Space>
                  
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add exercice
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )
                }
                            
export default ExerciceForm
