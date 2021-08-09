import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { PrismaService } from '../services/prisma';

@InputType()
class TripCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  endDate: Date;
}

@Resolver(Trip)
export class TripResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  owner(@Root() trip: Trip): Promise<User | null> {
    return this.prismaService.trip
      .findUnique({
        where: {
          id: trip.id,
        },
      })
      .owner();
  }

  @Query((returns) => [Trip])
  async allTrips(@Context() ctx) {
    return this.prismaService.trip.findMany();
  }

  @Query((returns) => Trip, { nullable: true })
  tripById(@Args('id') id: string) {
    return this.prismaService.trip.findUnique({
      where: { id },
    });
  }

  @Mutation((returns) => Trip)
  async createTrip(
    @Args('data') data: TripCreateInput,
    @Args('userId') userId: string,
    @Context() ctx,
  ): Promise<Trip> {
    const { title, startDate, endDate } = data;

    return this.prismaService.trip.create({
      data: {
        title: title,
        startDate: startDate === null ? new Date() : startDate,
        endDate: endDate === null ? new Date() : endDate,
        owner: {
          connect: { id: userId },
        },
      },
    });
  }
}
