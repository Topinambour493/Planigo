import React from "react";
import styles from "./Carousel.module.css";
import { AttractionType } from "../../types/AttractionType";

type CarouselProps = {
  attractions: AttractionType[];
};

const Carousel: React.FC<CarouselProps> = ({ attractions }) => {
  return (
    <div className={styles.carousel}>
      {attractions.map((attraction) => (
        <div key={attraction.location_id} className={styles.card}>
          <img
            //src={attraction.rating_image_url || "/placeholder.png"}
            alt={attraction.name}
          />
          <h3>{attraction.name}</h3>
          {/* <p>{attraction.description}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
