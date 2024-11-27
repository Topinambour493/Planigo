import { AttractionDetailType } from "../types/AttractionDetailType";

const BASE_URL = "https://api.example.com";

export const fetchAttractions = async (country: string): Promise<AttractionDetailType[]> => {
  const response = await fetch(`${BASE_URL}/attractions?country=${country}`);
  if (!response.ok) {
    throw new Error("Failed to fetch attractions");
  }
  return response.json();
};
