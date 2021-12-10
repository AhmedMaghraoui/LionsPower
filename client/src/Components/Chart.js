import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

export default function Chart({mealData}) {

    const data = [
        {
          type: 'calories',
          value: mealData.nutrients.calories
        },
        {
            type:'protein',
            value:mealData.nutrients.protein
        },
        {
            type:'fat',
            value:mealData.nutrients.fat
        },
        {
            type:'carbohydrates',
            value:mealData.nutrients.carbohydrates
        }
      ]
useEffect(() => {
    console.log(mealData.nutrients)
  
}, [])
    
  
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
  <Pie {...config} /></>)
}