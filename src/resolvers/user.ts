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
import { Post } from '../models/post';
import { User } from '../models/user';
import { PrismaService } from '../services/prisma';
import { PostCreateInput } from './post';

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  email: string;
}

@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field((type) => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput];
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts();
  }

  /* Fetch all users */
  @Query((returns) => [User])
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany();
  }

  /* Fetch all unpublished posts created by a specific user */
  @Query((returns) => [Post], { nullable: true })
  async draftsByUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  ): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      });
  }

  /* Create user */
  @Mutation((returns) => User)
  async signupUser(
    @Args('data') data: UserCreateInput,
    @Context() ctx,
  ): Promise<User> {
    const postData = data.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined };
    });

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        posts: {
          create: postData,
        },
      },
    });
  }
}
