export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CropRecommendation {
  Id: number;
  Name: string;
  Confidence: number;
  Description: string;
  Pros: string[];
  Cons: string[];
  WaterRequirement: string;
  SoilType: string;
  GrowthPeriod: string;
  Icon: string;
}
