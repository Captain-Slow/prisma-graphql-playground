import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { Trip } from './trip';

@ObjectType()
export class TripCategory {
  @Field((type) => String, { nullable: true })
  id: string | null;

  @Field()
  title: string;

  @Field((type) => Trip, { nullable: true })
  trip?: Trip | null;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
