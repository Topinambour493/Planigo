import React, {useState} from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { AttractionDetailType } from "../../types/AttractionDetailType";
import styles from "./AttractionDetailPage.module.css";
import { fetchAttraction } from "../../services/api";
import { LoaderFunctionArgs } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const attractionId = params.id as string;
    return await fetchAttraction(attractionId);
  } catch (error) {
    console.error("Failed to fetch attraction", error);
    throw new Response("Unable to load data", { status: 500 });
  }
}

const AttractionDetailPage: React.FC = () => {
  const attraction = useLoaderData() as AttractionDetailType;
  let [ isFavorite, setIsFavorite ] = useState<boolean>(JSON.parse(String(sessionStorage.getItem(attraction.location_id) === "true")))


  function handleHeart(id: string){
    sessionStorage.setItem(id, JSON.stringify(!isFavorite));
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.detailPage}>
      <h2>{attraction.name}</h2>
      <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} onClick={()=>handleHeart(attraction.location_id)} />
      <p>{attraction.description}</p>
    </div>
  );
};

export default AttractionDetailPage;