import { createRouter, publicQuery } from "./middleware.js";
import { env } from "./lib/env.js";

const PLACE_ID = "ChIJf4HB3ASnmkcRwuzT001B6E4";

interface GoogleReview {
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
}

interface GooglePlaceData {
  reviews?: GoogleReview[];
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
}

/**
 * Google Reviews Router
 * Fetches reviews securely from Google Places API (New).
 * The API key stays on the backend — never exposed to the frontend.
 */
export const googleReviewsRouter = createRouter({
  list: publicQuery.query(async () => {
    if (!env.googlePlacesApiKey) {
      return { reviews: [], error: "Google API key not configured" };
    }

    try {
      const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,displayName,rating,userRatingCount&languageCode=de`;

      const res = await fetch(url, {
        headers: {
          "X-Goog-Api-Key": env.googlePlacesApiKey,
          "X-Goog-FieldMask": "reviews,displayName,rating,userRatingCount",
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Google Places API error:", errText);
        return { reviews: [], error: `API error: ${res.status}` };
      }

      const data = await res.json() as GooglePlaceData;

      const reviews =
        data.reviews?.map((r) => ({
          name: r.authorAttribution?.displayName || "Anonymous",
          photoUrl: r.authorAttribution?.photoUri || null,
          rating: r.rating || 5,
          text: r.text?.text || "",
          relativeTime: r.relativePublishTimeDescription || "",
          publishTime: r.publishTime || "",
        })) || [];

      return {
        reviews,
        placeName: data.displayName?.text || "Faces Studio",
        averageRating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
      };
    } catch (err) {
      console.error("Failed to fetch Google reviews:", err);
      return { reviews: [], error: "Failed to fetch reviews" };
    }
  }),
});
