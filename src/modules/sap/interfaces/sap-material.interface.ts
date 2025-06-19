export interface Material {
  id: string;
  name: string;
  type: string;
  unitOfMeasure: string;
  containerLabel: string;
  quantityPerContainer: number;
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expiryDate: string;
}
