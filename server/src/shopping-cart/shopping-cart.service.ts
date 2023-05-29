import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UsersService } from './../users/users.service';
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';
import { ShoppingCart } from './shopping-cart.model';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly boilerPartsService: BoilerPartsService,
  ) {}

  async findAllItems(userId: number): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async addItem(addCartDto: AddToCartDto): Promise<ShoppingCart> {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addCartDto.username },
    });
    const item = await this.boilerPartsService.findOne(addCartDto.partId);

    cart.userId = user.id;
    cart.partId = item.id;
    cart.name = item.name;
    cart.boiler_manufacturer = item.boiler_manufacturer;
    cart.price = item.price;
    cart.in_stock = item.in_stock;
    cart.image = JSON.parse(item.images)[0];
    cart.total_price = item.price;

    return cart.save();
  }

  async updateItemCount({
    partId,
    count,
  }: {
    partId: number;
    count: number;
  }): Promise<ShoppingCart> {
    const targetItem = await this.shoppingCartModel.findOne({
      where: { partId },
    });

    const newPrice = targetItem.price * count;
    await this.shoppingCartModel.update(
      { count, total_price: newPrice },
      { where: { partId } },
    );

    return this.shoppingCartModel.findOne({
      where: { partId },
    });
  }

  async removeItem(partId: number): Promise<void> {
    await this.shoppingCartModel.findOne({ where: { partId } });
  }

  async cleanCart(userId: number): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
