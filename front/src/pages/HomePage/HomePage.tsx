import React, {useEffect, useState} from "react";
import Carousel from "../../components/Carousel/Carousel";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import {fetchAttractions} from "../../services/api";
import {AttractionType} from "../../types/AttractionType";
import styles from "./HomePage.module.css";
import {useLoaderData} from "react-router";

export async function loader() {
  try {
    return await fetchAttractions(); // Return the data if the request is successful
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Unable to load data", { status: 500 });
  }
}

const HomePage: React.FC = () => {
  const loaderData = useLoaderData() as AttractionType[] | [];
  const [attractions, setAttractions] = useState<AttractionType[]>(loaderData );

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