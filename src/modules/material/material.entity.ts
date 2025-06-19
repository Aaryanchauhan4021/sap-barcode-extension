import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

export type MaterialType = 'solid' | 'liquid' | 'roll' | 'tool';
export type UrgencyLevel = 'high' | 'medium' | 'low';

@Check(`"materialType" IN ('solid', 'liquid', 'roll', 'tool')`)
@Check(`"urgencyLevel" IN ('high', 'medium', 'low')`)
@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., "Nuts", "Paint", "Fabrics"

  @Column({ type: 'text' })
  materialType: MaterialType;

  @Column()
  unitOfMeasure: string; // e.g., "pcs", "kg", "ltr", "m", "sqft"

  @Column()
  containerLabel: string; // e.g., "Box", "Drum", "Bag"

  @Column('float')
  quantityPerContainer: number;

  @Column({ nullable: true, type: 'date' })
  expiryDate?: string;

  @Column({ type: 'text', default: 'medium' })
  urgencyLevel: UrgencyLevel;
}
