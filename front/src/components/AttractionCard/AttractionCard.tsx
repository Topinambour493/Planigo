import React from "react";
import { AttractionType } from "../../types/AttractionType";
import styles from "./AttractionCard.module.css";

type AttractionCardProps = {
  attraction: AttractionType;
};

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className={styles.card}>
      <h3>{attraction.name}</h3>
      {/* <p>{attraction.description}</p> */}
      <p>
        Location: {attraction.address_obj.city}, {attraction.address_obj.country}
      </p>
    </div>
  );
};

export default AttractionCard;
