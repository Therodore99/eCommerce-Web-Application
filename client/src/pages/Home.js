import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import SoldOut from "../components/home/SoldOut";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      

      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Old Phone Deals", "Best sellers", "New Arrivals"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
      Best sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sold Out Soon
      </h4>
      <SoldOut />

      <br />
      <br />
    </>
  );
};

export default Home;
