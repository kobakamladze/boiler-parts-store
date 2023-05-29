import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { BoilerParts } from './boiler-parts.model';
import { IBoilerParts } from './types';

@Injectable()
export class BoilerPartsService {
  constructor(
    @InjectModel(BoilerParts) private boilerPartsModel: typeof BoilerParts,
  ) {}

  async paginateAndFilter(
    query: IBoilerParts,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    return this.boilerPartsModel.findAndCountAll({ limit, offset });
  }

  async bestSellers(): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number): Promise<BoilerParts> {
    return this.boilerPartsModel.findByPk(id);
  }

  async findOneByName(name: string): Promise<BoilerParts> {
    return this.boilerPartsModel.findOne({ where: { name } });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      limit: 20,
      where: {
        [Op.or]: [
          {
            name: {
              [Op.startsWith]: str,
            },
          },
          {
            name: {
              [Op.endsWith]: str,
            },
          },
          {
            name: {
              [Op.like]: `%${str}%`,
            },
          },
        ],
      },
    });
  }
}
