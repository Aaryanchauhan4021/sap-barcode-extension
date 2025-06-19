import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Barcode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  materialId: string; // ✅ FIXED here

  @Column()
  materialName: string;

  @Column()
  totalQty: number;

  @Column()
  remainingQty: number;

  @Column({ nullable: true })
  urgencyLevel: string;

  @Column({ nullable: true })
  expiryDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
