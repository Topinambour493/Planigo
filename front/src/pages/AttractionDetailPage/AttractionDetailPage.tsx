import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AttractionDetailType } from "../../types/AttractionDetailType";
import styles from "./AttractionDetailPage.module.css";
import {useLoaderData} from "react-router";

export async function loader() {
  try {
    const response = await axios.get('/db2.json');
    return response.data; // Retourne les données si la requête réussit
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    throw new Response("Impossible de charger les données", { status: 500 });
  }
}
const AttractionDetailPage: React.FC = () => {
  const [attraction, setAttraction] = useState<AttractionDetailType>(useLoaderData());


  return (
    <div className={styles.detailPage}>
      <h2>{attraction.name}</h2>
      <p>{attraction.description}</p>
    </div>
  );
};

export default AttractionDetailPage;
