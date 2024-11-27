import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import { fetchAttractions } from "../../services/api";
//import { AttractionDetailType } from "../../types/AttractionDetailType";
import { AttractionType } from "../../types/AttractionType";
import styles from "./HomePage.module.css";
import axios from "axios";
import {useLoaderData} from "react-router";
import AttractionFilters from "../../components/AttractionFilters/AttractionFilters";
//import '../../../public/db.json'



export async function loader() {
  try {
    const response = await axios.get('/db.json');
    return response.data.data; // Retourne les données si la requête réussit
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    throw new Response("Impossible de charger les données", { status: 500 });
  }
}
const HomePage: React.FC = () => {
  const [attractions, setAttractions] = useState<AttractionType[]>(useLoaderData());

  return (
    <div className={styles.homePage}>
      <h1>Top Attractions</h1>
      <Carousel attractions={attractions.slice(0, 10)} />
      <AttractionFilters/>
      <div className={styles.list}>
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.location_id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
