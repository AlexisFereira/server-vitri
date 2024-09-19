import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  ExistEmail,
  LoginResponse,
  LoginUserInput,
  ResetTokenResponse,
} from './dto/auth.dto';
import { CreateUserInput, User, UserDocument } from 'src/users/users.schema';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(userInput: LoginUserInput): Promise<User> {
    const user = await this.userService.getOneUser(userInput.email);
    if (user && (await (user as any).comparePassword(userInput.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = {
      username: user.email,
      sub: user._id,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }),
    };
  }

  async signUp(userInput: CreateUserInput): Promise<User> {
    try {
      const user = await this.userService.createUser(userInput);
      if (user) {
        console.log('hay user');
        this.mailerService
          .sendMail({
            to: 'alexis.fereira@gmail.com', // List of receivers email address
            from: 'alexis.fereira@gmail.com', // Senders email address
            subject: 'VitriMovil: Confirmacion de cuenta de correo ✔',
            template: 'confirmEmail', // The `.twig` extension is appended automatically.
            context: {
              linkToConfirm: `http://localhost:3000/auth/confirm-email/${user._id}`,
              username: `${user.firstName} ${user.lastName}`,
            },
          })
          .then(() => {
            console.log('Email sended');
          });
        return user;
      }
      throw new Error('Error creating user.');
    } catch (e) {
      console.log(e);
    }
  }

  async confirmUserEmail(id: string): Promise<LoginResponse> {
    const user = await this.userService.getUserById(id);
    user.confirmed = true;
    await (user as UserDocument).save();
    const payload = {
      username: user.email,
      sub: user._id,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }),
    };
  }

  //create token for reset password
  async createResetLink(email: string): Promise<ResetTokenResponse> {
    const user = await this.userService.getOneUser(email);
    if (!user) {
      return {
        exists: false,
        message: '',
      };
    }
    const payload = {
      username: user.email,
      sub: user._id,
    };
    const resetToken = this.jwtService.sign(payload, { expiresIn: '2m' });

    await this.mailerService
      .sendMail({
        to: 'alexis.fereira@gmail.com',
        from: 'alexis.fereira@gmail.com',
        subject: 'VitriMovil: Recuperar contraseña 🔓',
        template: 'resetPassword',
        context: {
          linkToReset: `http://localhost:3000/auth/reset-pass/${resetToken}`,
          username: `${user.firstName} ${user.lastName}`,
        },
      })
      .then((result) => {
        if (result) {
          console.log('Mensaje enviado con exito.');
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return {
      exists: true,
      message: 'Correo enviado con exito.',
    };
  }

  //reset password
  async resetPassword(newPass: string, user): Promise<User> {
    const updatedUser = await this.userService.getUserById(user.userId);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPass, salt);
    updatedUser.password = password;
    await (updatedUser as UserDocument).save();

    await this.mailerService
      .sendMail({
        to: 'alexis.fereira@gmail.com',
        from: 'alexis.fereira@gmail.com',
        subject: 'VitriMovil: Alerta de  cambio de contraseña 📢 ',
        template: 'passwordReseted',
        context: {
          username: `${user.firstName} ${user.lastName}`,
        },
      })
      .then((result) => {
        if (result) {
          console.log('Mensaje enviado con exito.');
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return updatedUser;
  }

  async validateEmail(email: string): Promise<ExistEmail> {
    const exist = await this.userService.getOneUser(email);
    return { existEmail: !!exist };
  }
}
