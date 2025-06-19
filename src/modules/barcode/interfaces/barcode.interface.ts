export interface BarcodeInfo {
  id: string;
  materialId: string;
  remainingQty: number;
  urgencyLevel?: string;
  expiryDate?: string;
}
