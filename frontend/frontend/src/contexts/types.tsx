export interface User {
  id: string;
  name: string;
  email: string;
}

export type CropRecommendation = {
  Id: string | number; // Unique ID
  Name: string; // Crop name
  Icon: string; // Iconify icon name
  Confidence: number; // % match confidence
  Description: string; // Crop description
  Pros: string[]; // Advantages
  Cons: string[]; // Challenges
  WaterRequirement: string; // Water needs (e.g., "High")
  SoilType: string; // Suitable soil type
  GrowthPeriod: string; // Growth duration
  Location: string; // Crop location
  PriceTimeline: {
    // Data for LineChart
    Date: string; // e.g., "2025-09-01"
    Price: number; // Price in ₹/kg
  }[];
};
