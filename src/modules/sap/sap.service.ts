import { Injectable, NotFoundException } from '@nestjs/common';
import { Material } from './interfaces/sap-material.interface';
import { MOCK_MATERIALS } from './mock/sap.mock-data';

@Injectable()
export class SapService {
  private readonly materials: Material[] = MOCK_MATERIALS;

  async fetchMaterials(page = 1, limit = 10): Promise<Material[]> {
    const start = (page - 1) * limit;
    const data = this.materials.slice(start, start + limit);
    return Promise.resolve(data);
  }

  async getMaterialById(materialId: string): Promise<Material> {
    const material = this.materials.find((m) => m.id === materialId);
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    return Promise.resolve(material);
  }

  async createMaterial(material: Material): Promise<Material> {
    const newMaterial: Material = {
      ...material,
      id: (this.materials.length + 1).toString(),
    };
    this.materials.push(newMaterial);
    return Promise.resolve(newMaterial);
  }

  async updateMaterial(
    id: string,
    updates: Partial<Material>,
  ): Promise<Material> {
    const index = this.materials.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new NotFoundException('Material not found');
    }
    this.materials[index] = { ...this.materials[index], ...updates };
    return Promise.resolve(this.materials[index]);
  }
}
