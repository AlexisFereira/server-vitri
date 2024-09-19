import { Module } from '@nestjs/common';
import { CommerceListService } from './commerce-list.service';
import { CommerceListResolver } from './commerce-list.resolver';
import { CommerceList, CommerceListSchema } from './commerce-list.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommerceList.name,
        schema: CommerceListSchema,
      },
    ]),
  ],
  providers: [CommerceListResolver, CommerceListService],
})
export class CommerceListModule {}
