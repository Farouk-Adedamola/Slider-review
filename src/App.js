import "./App.css";
import React, { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import data from "./data";
import "./index.css";

function App() {
  const [people, setPeople] = useState(data);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let lastSlide = people.length - 1;
    if (value < 0) {
      setValue(lastSlide);
    }
    if (value > lastSlide) {
      setValue(0);
    }
  }, [value, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setValue(value + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [value]);
  return (
    <>
      <section className="section">
        <header className="header">
          <h1>
            <span>/</span> reviews
          </h1>
        </header>
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { image, name, title, quote, id } = person;
            let position = "nextSlide";
            if (personIndex === value) {
              position = "activeSlide";
            }
            if (
              personIndex === value - 1 ||
              (value === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button
            type="button"
            className="prev"
            onClick={() => setValue(value - 1)}
          >
            <FiChevronLeft className="angle" />
          </button>
          <button
            className="next"
            type="button"
            onClick={() => setValue(value + 1)}
          >
            <FiChevronRight className="angle" />
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
