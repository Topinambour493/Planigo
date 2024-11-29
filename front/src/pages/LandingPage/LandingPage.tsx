import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { UserType } from "../../types/UserType";

type LoaderData = {
  profileTypes: string[];
  countries: string[];
};

export async function loader() {
  // Fetch the list of countries from an external API
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countriesData = await response.json();
  const countries = countriesData.map((country: any) => country.name.common).sort();

  return {
    profileTypes: ['Local', 'Touriste', 'Professionnel'],
    countries,
  };
}

const LandingPage: React.FC = () => {
  const loaderData = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  const [countries, setCountries] = useState<string[]>([]);
  const [profileTypes, setProfileTypes] = useState<string[]>([]);
  const [profileType, setProfileType] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (loaderData) {
      setCountries(loaderData.countries);
      setProfileTypes(loaderData.profileTypes);
    }
  }, [loaderData]);

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileType(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Profile Type: ${profileType}, Country: ${country}`);
    sessionStorage.setItem("profileType", profileType);
    sessionStorage.setItem("country", country);
    sessionStorage.setItem("userSession", JSON.stringify({ profileType, country }));
    navigate("/home");
  };

  return (
    <div className={styles.landingPage}>
      <h1 className={styles.first}>Bienvenue sur Planigo</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="profileType">Quel est votre type de profil:</label>
          <select id="profileType" value={profileType} onChange={handleProfileChange} required>
            <option value="">Sélectionnez le type de profile</option>
            {profileTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Choissisez votre pays:</label>
          <select id="country" value={country} onChange={handleCountryChange} required>
            <option value="">Sélectionnez un pays</option>
            {countries.map((country) => (
              <option key={country} value={country.toLowerCase()}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Continuez</button>
      </form>
    </div>
  );
};

export default LandingPage;