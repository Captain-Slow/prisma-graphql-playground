import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from './user';
import { TripMember } from './tripMember';
import { TripCategory } from './tripCategory';

@ObjectType()
export class Trip {
  @Field((type) => String, { nullable: true })
  id: string | null;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  bannerUrl?: string;

  @Field((type) => Date)
  startDate: Date;

  @Field((type) => Date)
  endDate: Date;

  @Field((type) => User, { nullable: true })
  owner?: User | null;

  @Field((type) => [TripMember], { nullable: true })
  tripMembers?: [TripMember] | null;

  @Field((type) => [TripCategory], { nullable: true })
  tripCategories?: [TripCategory] | null;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
