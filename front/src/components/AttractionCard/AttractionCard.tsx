import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"; 
import { AttractionType } from "../../types/AttractionType";
import styles from "./AttractionCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


const AttractionCard: React.FC<{ attraction: AttractionType }> = ({ attraction }) => {

  let [ isFavorite, setIsFavorite ] = useState<boolean>(JSON.parse(String(sessionStorage.getItem(attraction.location_id) === "true")))


  function handleHeart(id: string){
    sessionStorage.setItem(id, JSON.stringify(!isFavorite));
    setIsFavorite(!isFavorite)
  }


  return (
    <div className={styles.card}>
      <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} onClick={()=>handleHeart(attraction.location_id)} />
      <Link to={`/attraction/${attraction.location_id}`}>
        <h3>{attraction.name}</h3>
        <p>
          {attraction.address_obj.city}, {attraction.address_obj.country} 
        </p>
      </Link>
    </div>
  );
};

export default AttractionCard;
