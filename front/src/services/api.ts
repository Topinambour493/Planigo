import { AttractionDetailType } from "../types/AttractionDetailType";
import axios from "axios";
import {AttractionType} from "../types/AttractionType";

const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchAttractions = async (): Promise<AttractionType[]> => {
  const response = await axios.get(`${BASE_URL}/attractions/`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch attractions");
  }
  return response.data;
};

export const fetchAttraction = async (attractionId: string): Promise<AttractionDetailType> => {
  const response = await axios.get(`${BASE_URL}/attractions/${attractionId}/`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch attraction");
  }
  return response.data;
};