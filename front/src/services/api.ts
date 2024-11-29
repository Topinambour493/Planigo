import { AttractionDetailType } from "../types/AttractionDetailType";
import axios from "axios";
import {AttractionType} from "../types/AttractionType";
import env from "react-dotenv";


const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchAttractions = async (): Promise<AttractionType[]> => {
  const response = await axios.get("/api/v1/location/search", {
    params : {
      language: "fr", // Langue
      searchQuery: "Paris",
      key: env.TRIPADVISOR_API_KEY
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
  console.log(response)
  if (response.status !== 200) {
    throw new Error("Failed to fetch attractions");
  }
  return response.data.data;
};

export const fetchAttractionsFavorite = async (): Promise<AttractionType[]> => {
  const response = await axios.get(`${BASE_URL}/attractions/`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch attractions");
  }
  return response.data;
};

export const fetchAttraction =async (locationId: string): Promise<AttractionDetailType> => {
  const response = await axios.get("/api/v1/location/"+locationId+"/details", {
    params : {
      language: "fr", // Langue
      key:  env.TRIPADVISOR_API_KEY
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
  console.log(response)
  if (response.status !== 200) {
    throw new Error("Failed to fetch attractions");
  }
  return response.data;
}

// export const fetchAttraction = async (attractionId: string): Promise<AttractionDetailType> => {
//   const response = await axios.get(`${BASE_URL}/attractions/${attractionId}/`);
//   if (response.status !== 200) {
//     throw new Error("Failed to fetch attraction");
//   }
//   return response.data;
// };