import { Material } from '../interfaces/sap-material.interface';

export const MOCK_MATERIALS: Material[] = [
  {
    id: 'MAT001',
    name: 'Nut Bolt',
    type: 'nut',
    unitOfMeasure: 'box',
    containerLabel: 'Box-A',
    quantityPerContainer: 50,
    urgencyLevel: 'MEDIUM',
    expiryDate: '2025-12-31',
  },
  {
    id: 'MAT002',
    name: 'Red Paint',
    type: 'paint',
    unitOfMeasure: 'can',
    containerLabel: 'Can-R',
    quantityPerContainer: 20,
    urgencyLevel: 'HIGH',
    expiryDate: '2025-08-15',
  },
];
