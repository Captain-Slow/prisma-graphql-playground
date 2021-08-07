import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DefaultAdminModule } from 'nestjs-admin';

import { PrismaService } from '../services/prisma';
import { PostResolver } from '../resolvers/post';
import { UserResolver } from '../resolvers/user';
import { TripResolver } from '../resolvers/trip';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    DefaultAdminModule,
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, PostResolver, TripResolver],
})
export class AppModule {}
