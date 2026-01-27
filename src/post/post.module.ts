import { Module } from '@nestjs/common';
import { PostsService } from './providers/post.service';
import { PostsController } from './post.controller';
import { UsersModule } from 'src/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider.ts';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports: [UsersModule, TagsModule, PaginationModule, TypeOrmModule.forFeature([Post, MetaOption])],
})
export class PostModule {}
