import { featureDetails, type FeatureDetail } from './feature-details-data';

export function getFeatureById(id: string): FeatureDetail | undefined {
  return featureDetails.find(feature => feature.id === id);
}

export function getAllFeatures(): FeatureDetail[] {
  return featureDetails;
}

export function getFeaturesByStatus(status: FeatureDetail['status']): FeatureDetail[] {
  return featureDetails.filter(feature => feature.status === status);
}

export function getFeaturesByCategory(category: FeatureDetail['category']): FeatureDetail[] {
  return featureDetails.filter(feature => feature.category === category);
}
