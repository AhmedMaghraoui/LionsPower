import { Steps, Button, message } from 'antd';
import React, {useState,useEffect} from 'react'
import PricesTable from '../Components/PricesTable';
import {useNavigate} from 'react-router'


const PaymenPage = () => {
    const navigate = useNavigate()
    let token = localStorage.getItem('token')
    let [isPremium,setIsPremium] = useState(localStorage.getItem('isPremium'))

    if (isPremium === 'true'){navigate('/meal')}

    useEffect(async () => {
      
    }, [])

    return (
      <>
        <PricesTable/>
      </>
    );
}

export default PaymenPage
