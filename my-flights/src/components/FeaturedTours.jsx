import React from 'react';
import '../styles/styles.css'
import tour1 from "../assets/tour-1.jpg"
import tour2 from "../assets/tour-2.jpg"
import tour3 from "../assets/tour-3.jpg"
import tour4 from "../assets/tour-4.jpg"
import Tnj from  "../assets/Tnj.png"
import Kallanai from  "../assets/Kallanai.png"

function FeaturedTours() {
  return (
    <section className="section__container tours__container" id="tours">
      <h2 className="section__header">Featured Tours</h2>
      <div className="tours__grid">
        <div className="tours__card">
          <img src={Kallanai} alt="tour" />
          <div className="tours__card__content">
            <h4>Thanjavur</h4>
            <p>Explore the Chozha Denasity.Amaze with the architecture of Bharadeshwara Temple.</p>
          </div>
        </div>
        <div className="tours__card">
          <img src={tour2} alt="tour" />
          <div className="tours__card__content">
            <h4>Mysore</h4>
            <p>Experience the beauty and culture of Muhal Empire through our tours.</p>
          </div>
        </div>
        <div className="tours__card">
          <img src={tour3} alt="tour" />
          <div className="tours__card__content">
            <h4>Kochi</h4>
            <p>Discover the romantic charm of Paris with our guided tours</p>
          </div>
        </div>
        <div className="tours__card">
          <img src={tour4} alt="tour" />
          <div className="tours__card__content">
            <h4>Goa</h4>
            <p>Want fun with friend?Goa welcomes you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTours;
