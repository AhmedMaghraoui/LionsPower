import React from "react"
import Meal from "./Meal"

export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients

  return (
    <main>
      <section className="meals">
        {mealData.meals.map(meal => {
          return <Meal key={meal.id} meal={meal} />
        })}
      </section>
    </main>
  )
}