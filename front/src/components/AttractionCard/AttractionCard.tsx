import React from "react";
import { Link } from "react-router-dom"; 
import { AttractionType } from "../../types/AttractionType";
import styles from "./AttractionCard.module.css"; 

const AttractionCard: React.FC<{ attraction: AttractionType }> = ({ attraction }) => {
  return (
    <div className={styles.card}> 
      <Link to={`/attraction/${attraction.attraction_id}`}>
        <h3>{attraction.name}</h3> 
        <p>
          {attraction.address_obj.city}, {attraction.address_obj.country} 
        </p>
      </Link>
    </div>
  );
};

export default AttractionCard;
