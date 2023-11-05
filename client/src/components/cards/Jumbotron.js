//Type-writer effect
import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text, // get an array of string as prop from parents
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;