import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import { fetchAttractions } from "../../services/api";
//import { AttractionDetailType } from "../../types/AttractionDetailType";
import { AttractionType } from "../../types/AttractionType";
import styles from "./HomePage.module.css";
import axios from "axios";
//import '../../../public/db.json'

const HomePage: React.FC = () => {
  const [attractions, setAttractions] = useState<AttractionType[]>([]);

  useEffect(() => {
    axios.get('../../../public/db.json')    
    .then(res => setAttractions(res.data))    
    .catch(err => console.log(err))
    console.log(attractions)
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Top Attractions</h1>
      <Carousel attractions={attractions.slice(0, 10)} />
      <div className={styles.list}>
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.location_id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
