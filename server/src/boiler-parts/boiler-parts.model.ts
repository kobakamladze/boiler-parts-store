import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class BoilerParts extends Model {
  @Column
  boiler_manufacturer: string;

  @Column
  parts_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  name: string;

  @Column
  vendor_code: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestseller: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;

  @Column
  compatibility: string;
}
