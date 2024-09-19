import { Args, Resolver, Query, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  LoginUserInput,
  LoginResponse,
  ResetTokenResponse,
  ResetTokenIsValid,
  ExistEmail,
} from './dto/auth.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/graphql.guard';
import { CreateUserInput, User } from 'src/users/users.schema';
import { JwtAuthGuard } from './guards/jwt.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('LoginUserInput') input: LoginUserInput,
    @Context() context,
  ): Promise<LoginResponse> {
    return await this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signUp(
    @Args('createUserInput') userInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.signUp(userInput);
  }

  @Query(() => LoginResponse)
  async confirmEmail(@Args('userId') userId: string): Promise<LoginResponse> {
    return this.authService.confirmUserEmail(userId);
  }

  @Query(() => ResetTokenResponse)
  async createResetLink(
    @Args('email') email: string,
  ): Promise<ResetTokenResponse> {
    return await this.authService.createResetLink(email);
  }

  @Query(() => ResetTokenIsValid)
  @UseGuards(JwtAuthGuard)
  async verifyResetLink(): Promise<ResetTokenIsValid> {
    return { isValid: true };
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @Args('newPassword') pass: string,
    @Context() context,
  ): Promise<User> {
    return await this.authService.resetPassword(pass, context.req.user);
  }

  @Query(() => ExistEmail)
  async validateEmail(
    @Args('emailToValidate') email: string,
  ): Promise<ExistEmail> {
    return await this.authService.validateEmail(email);
  }
}
