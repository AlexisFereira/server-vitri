import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsResolver } from './catalogs.resolver';
import { Catalog, CatalogSchema } from './catalogs.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Catalog.name,
        schema: CatalogSchema,
      },
    ]),
  ],
  providers: [CatalogsService, CatalogsResolver],
  exports: [CatalogsService, CatalogsResolver],
})
export class CatalogsModule {}
