import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user';
import { Trip } from './trip';

@ObjectType()
export class TripMember {
  @Field((type) => String, { nullable: true })
  id: string | null;

  @Field((type) => Trip, { nullable: true })
  trip?: Trip | null;

  @Field((type) => User, { nullable: true })
  user?: User | null;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
