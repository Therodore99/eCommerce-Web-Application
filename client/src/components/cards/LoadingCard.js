import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
    //create #count cards
  const cards = () => {
    let totalCards = [];
    
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards; //return #count cards
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
