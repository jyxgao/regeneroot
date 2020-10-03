import React from "react"

import "./Welcome.css"
import Logo from "../../assets/logo.png"

const Welcome = ({ element }) => {
  return (
    <main>
      <section className="welcome">
        <div ref={element}>
          <img src={Logo} alt="logo" className="welcome--logo" />
          <p>Build Garden Anywhere...</p>
          <button className="welcome__cta-primary">Contact us</button>
        </div>
      </section>
    </main>
  )
}

export default Welcome;