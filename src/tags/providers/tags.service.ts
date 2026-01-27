import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRespository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagsRespository.create(createTagDto);

    return await this.tagsRespository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let result = await this.tagsRespository.find({
      where: {
        id: In(tags),
      },
    });
    return result;
  }

  public async delete(id: number) {
    await this.tagsRespository.delete(id);

    return {
        deleted: true,
        id,
    }
  }



  public async softRemove(id: number) {
    await this.tagsRespository.softDelete(id);

    return {
        deleted: true,
        id,
    }
  }



}
