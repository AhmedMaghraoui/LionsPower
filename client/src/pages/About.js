import React from "react";
import tt from "./tt.jpg";
import "./About.css"

const About = () =>{
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${tt})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        Whether you’re trying to lose weight, or just improve your diet, meal planning is an easy step to help you reach your goals. There are numerous advantages of planning out your meals in advance that can not only save your waistline, but also improve your health.

"With anything in life, if you fail to plan, you plan to fail. That applies to meal planning as well," says Silvia Veri, registered dietitian at the Beaumont Weight Control Center - Canton. "Planning meals and snacks ahead of time increases the chance for success, it increases the likelihood a healthier food choice will be made."
</p>

        
      </div>
    </div>
  );
}

export default About;
