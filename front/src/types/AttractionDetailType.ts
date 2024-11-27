export type AttractionDetailType = {
    location_id: number;
    name: string;
    description: string;
    web_url: string;
    address_obj: {
      street1: string;
      street2: string;
      city: string;
      state: string;
      country: string;
      postalcode: string;
      address_string: string;
    };
    ancestors: Array<{
      abbrv: string;
      level: string;
      name: string;
      location_id: number;
    }>;
    latitude: number;
    longitude: number;
    timezone: string;
    email: string;
    phone: string;
    website: string;
    write_review: string;
    ranking_data: {
      geo_location_id: number;
      ranking_string: string;
      geo_location_name: string;
      ranking_out_of: number;
      ranking: number;
    };
    rating: number;
    rating_image_url: string;
    num_reviews: string;
    review_rating_count: Record<string, string>;
    subratings: Record<
      string,
      {
        name: string;
        localized_name: string;
        rating_image_url: string;
        value: number;
      }
    >;
    photo_count: number;
    see_all_photos: string;
    price_level: string;
    hours: {
      periods: Array<{
        open: { day: number; time: string };
        close: { day: number; time: string };
      }>;
      weekday_text: string[];
    };
    amenities: string[];
    features: string[];
    cuisine: Array<{ name: string; localized_name: string }>;
    parent_brand: string;
    brand: string;
    category: { name: string; localized_name: string };
    subcategory: Array<{ name: string; localized_name: string }>;
    groups: Array<{
      name: string;
      localized_name: string;
      categories: Array<{ name: string; localized_name: string }>;
    }>;
    styles: string[];
    neighborhood_info: Array<{ location_id: string; name: string }>;
    trip_types: Array<{ name: string; localized_name: string; value: string }>;
    awards: Array<{
      award_type: string;
      year: number;
      images: {
        tiny: string;
        small: string;
        large: string;
      };
      categories: string[];
      display_name: string;
    }>;
    error?: {
      message: string;
      type: string;
      code: number;
    };
  };
  
  