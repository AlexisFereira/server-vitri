import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { CatalogsModule } from 'src/catalogs/catalogs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CatalogsModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
