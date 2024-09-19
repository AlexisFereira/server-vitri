import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { CatalogsService } from 'src/catalogs/catalogs.service';

@Injectable()
export class UsersService {
  constructor(
    private catalogService: CatalogsService,
    @InjectModel(User.name) private model: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.model.find({ active: true });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.model.findById(id);
    if (!user) {
      throw new Error('User does not exists.');
    }
    return user;
  }

  async getOneUser(email: string): Promise<User> {
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new Error('User does not exists.');
    }
    return user;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const existUser = await this.model.findOne({ email: userInput.email });

    if (existUser) {
      throw new Error('User already exits.');
    }

    //has pass
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userInput.password, salt);
    userInput.password = hash;

    const user = new this.model(userInput);
    await user.save();

    //create catalog for user
    const catalog = await this.catalogService.createCatalog({
      userId: user._id,
      commerceName: userInput.commerceName,
      commerceType: userInput.commerceType,
    });
    user.catalogs.push(catalog._id);
    user.save();

    return user;
  }

  async updateUser(
    id: string,
    userInput: Partial<CreateUserInput>,
  ): Promise<User> {
    return await this.model.findOneAndUpdate({ _id: id }, userInput);
  }

  async deleteUser(_id: string): Promise<User> {
    return await this.model.findByIdAndUpdate({ _id }, { active: false });
  }
}
