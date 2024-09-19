import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, User } from './users.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello';
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  async getUserById(@Args('userId') userId: string): Promise<User | Error> {
    return this.usersService.getUserById(userId);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<User | Error> {
    return this.usersService.createUser(userInput);
  }
}
