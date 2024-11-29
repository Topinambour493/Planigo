import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { AttractionDetailType } from "../../types/AttractionDetailType";
import styles from "./AttractionDetailPage.module.css";
import { fetchAttraction } from "../../services/api";
import { LoaderFunctionArgs } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const locationId = params.id as string;
    return await fetchAttraction(locationId);
  } catch (error) {
    console.error("Failed to fetch attraction", error);
    throw new Response("Unable to load data", { status: 500 });
  }
}

const AttractionDetailPage: React.FC = () => {
  const attraction = useLoaderData() as AttractionDetailType;

  return (
    <div className={styles.detailPage}>
      <h2>{attraction.raw_data.name}</h2>
      <p>{attraction.raw_data.description}</p>
    </div>
  );
};

export default AttractionDetailPage;