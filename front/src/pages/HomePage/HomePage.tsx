import React, {useEffect, useState} from "react";
import Carousel from "../../components/Carousel/Carousel";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import {fetchAttractions} from "../../services/api";
import {AttractionType} from "../../types/AttractionType";
import styles from "./HomePage.module.css";
import {useLoaderData, useSearchParams} from "react-router";
import {useParams} from "react-router-dom";

export async function loader() {
  try {
    return await fetchAttractions(); // Return the data if the request is successful
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Unable to load data", { status: 500 });
  }
}

const HomePage: React.FC = () => {
let [searchParams] = useSearchParams();
  const loaderData = useLoaderData() as AttractionType[] | undefined;
  const [attractions, setAttractions] = useState<AttractionType[]>(loaderData || []);

  if (attractions.length === 0) {
    return <div>Loading...</div>;
  }

  function handleCity(e: any){
    sessionStorage.setItem("city", e.target.value)
  }


  return (
    <div className={styles.homePage}>
      <h1>Top Attractions</h1>
      <Carousel attractions={attractions.slice(0, 10)} />
      <form>
        <input name="city" type={"text"} placeholder={"ville..."} onChange={(e)=>handleCity(e)}/>
        <button>Rechercher</button>
      </form>
      <div className={styles.list}>
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.location_id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;