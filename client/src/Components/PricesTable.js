import React, {useState, useEffect} from 'react'
import './PricingStyles.css'
import { Typography,Modal, Button ,Space} from 'antd';
import { PaymentPage } from 'twilio/lib/rest/api/v2010/account/call/payment';
import PaymentForm from './Payment';
import {useNavigate} from 'react-router'
import SignInOrSignUp from './SignInOrSignUp';
import { GlobalContext } from './GlobalContext'


const PricesTable = () => {
    const {globalState, setGlobalState} = React.useContext(GlobalContext)

    //////////////////////////////////////////////////////////////////////////
    const [isModalVisibleS, setIsModalVisibleS] = useState(false);

    const showModalS = () => {
      setIsModalVisibleS(true);
    };

    const handleOkS = () => {
      setIsModalVisibleS(false);
     };

     const handleCancelS = () => {
      setIsModalVisibleS(false);
    };
    //////////////////////////////////////////////////////////////////////////

    let navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [price, setPrice] = useState(null)
    const [subscription,setSubscription] = useState()
    const [card, setCard] = useState()

    const showModal = (p) => {
        //console.log(p)
      setIsModalVisible(true);
    };

    const handleOk = async () => {
      setIsModalVisible(false);
      const isPremium =  localStorage.getItem('isPremium')
      console.log(isPremium)
      if (isPremium === 'true'){
        await setGlobalState({...globalState,  isPremium: true})
        navigate('/meal')
      }
     };

     const handleCancel = () => {
      setIsModalVisible(false);
    };
    const meditation = ()=>{
        setPrice(0)
        setSubscription('Meditation')
        console.log(price)
        showModal()
    }
    const yoga = ()=>{
        setPrice(20)
        setSubscription('Yoga')
        console.log(price)
        showModal()
    }
    const gym = ()=>{
        setPrice(50)
        setSubscription('Gym Workout')
        console.log(price)
        showModal()
    }

    const changeCard = (data)=>{
        setCard(data)
    }

    useEffect(() => {
        handleOkS()
    }, [globalState.token])

    return (
        <>
        <Modal title={`Payment ${price}$ for ${subscription} subscription`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <PaymentForm changeCard={changeCard}/>
        </Modal>
        <div style={{margin: '5rem'}}>
        <section class="price-comparison">
          <div class="price-column">
            <div class="price-header">
              <div class="price">
                <div class="dollar-sign">$</div>
                0
                <div class="per-month"> /1st MO THEN 10$</div>
              </div>
              <div class="plan-name">Meditation</div>
            </div>
            <div class="divider"></div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Meal Plan
            </div>
            <div class="feature inactive">
              <img src={process.env.PUBLIC_URL + "/x-square.svg"}/>
              Exercices
            </div>
            <div class="feature inactive">
              <img src={process.env.PUBLIC_URL + "/x-square.svg"}/>
              Meal Delivery
            </div>
            {globalState.token ? <button onClick={meditation} class="cta">Start Today</button> : <button onClick={showModalS} class="cta">Start Today</button>}
          </div>
          <div class="price-column popular">
            <div class="most-popular">Most Popular</div>
            <div class="price-header">
              <div class="price">
                <div class="dollar-sign">$</div>
                20
                <div class="per-month">/mo</div>
              </div>
              <div class="plan-name">Yoga</div>
            </div>
            <div class="divider"></div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Meal Plan
            </div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Exercices
            </div>
            <div class="feature inactive">
              <img src={process.env.PUBLIC_URL + "/x-square.svg"}/>
              Meal Delivery
            </div>
            {globalState.token ? <button onClick={yoga} class="cta">Start Today</button> : <button onClick={showModalS} class="cta">Start Today</button>}
          </div>
          <div class="price-column">
            <div class="price-header">
              <div class="price">
                <div class="dollar-sign">$</div>
                50
                <div class="per-month">/mo</div>
              </div>
              <div class="plan-name">Gym Workout</div>
            </div>
            <div class="divider"></div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Meal Plan
            </div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Exercices
            </div>
            <div class="feature">
              <img src={process.env.PUBLIC_URL + '/check-circle.svg'}/>
              Meal Delivery
            </div>
            {globalState.token ? <button onClick={gym} class="cta">Start Today</button> : <button onClick={showModalS} class="cta">Start Today</button>}
          </div>
        </section>
        </div>
        <Modal title="Sign in" visible={isModalVisibleS} onOk={handleOkS} onCancel={handleCancelS} footer={[]}>
                <SignInOrSignUp/>
        </Modal>
        </>
    )
}

export default PricesTable
