import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Post } from './post';
import { Trip } from './trip';
import { TripMember } from './tripMember';

@ObjectType()
export class User {
  @Field((type) => String, { nullable: true })
  id: string | null;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null;

  @Field((type) => [Trip], { nullable: true })
  trips?: [Trip] | null;

  @Field((type) => [TripMember], { nullable: true })
  tripMemberships?: [TripMember] | null;
}
