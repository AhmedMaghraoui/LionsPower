import React, { useState , useEffect} from "react"
import MealList from "../Components/MealList"
import {CalculatorOutlined} from '@ant-design/icons'
import { Typography,Modal, Button ,Space} from 'antd';
import {useNavigate} from 'react-router'
import UserInfosFormulaire from "../Components/UserInfosFormulaire";
import Chart from "../Components/Chart"
const { Title,Text,Link } = Typography

const contentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '3rem 3rem',
  justifyContent :'center'
}

const MealPage = () =>{
  let navigate = useNavigate()
  const [mealData, setMealData] = useState(null)
  const [calories, setCalories] = useState(2000)

  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
     };

     const handleCancel = () => {
      setIsModalVisible(false);
    };

    useEffect(() => {
       
        return () => {
          
        }
    }, [calories])


  /////////////////////////////////////////////////////////
  let isPremium = localStorage.getItem('isPremium')
  console.log('test'+isPremium)
  function getMealData() {
    
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=0b05dffc9250464f9e112813d6e89ef6&timeFrame=day&targetCalories=${calories}`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data)
      })
      .catch(() => {
        console.log("error")
      })
  }

  function handleChange(e) {
    setCalories(e.target.value)
  }

  function calcCalories(cal){
    setCalories(cal)
  }

  function Prices (){
     navigate('/prices')
  }

  return (
    <div className="Meal" style={{contentStyle }} >
        <Space direction="vertical" style={{ width: 600,alignItems: 'center' }}>
            <Title>Build your Diet</Title>
            <Text>Eat This Much creates personalized meal plans based on your food preferences. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more.</Text>
            <Text><Text mark>Create your meal plan right here in seconds.</Text><Link onClick={showModal}><Text keyboard><CalculatorOutlined />Nutrition calculator</Text></Link></Text>
            <Text>Ready to give it a shot? Let us know your diet.</Text>
        </Space>

        
      <section className="controls">
          <div style={{width:250}}></div>
          
       
      <Modal title="Nutrition calculator" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UserInfosFormulaire calcCalories={tdee => calcCalories(tdee)}/>
      </Modal>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
          onInput={handleChange}
          value={calories}
        />
        {isPremium ? <button onClick={getMealData}>Get Daily Meal Plan</button> : <button onClick={Prices}>Get Daily Meal Plan</button> }
      </section> 
      {mealData && <div style={{width: 250, height:150, margingBottom:200}}><Chart mealData={mealData}/></div>}
      {mealData && <MealList mealData={mealData} /> }  

    </div>
  )
}

export default MealPage