import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto.';
import { REQUEST } from '@nestjs/core';
import express from 'express';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST) 
        private readonly request: express.Request
    ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto | undefined,
    repository: Repository<T>,
  ) {
    const page = paginationQuery?.page ?? 1;
    const limit = paginationQuery?.limit ?? 10;
    let results = await repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

        // Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage =
      page === totalPages
        ? page
        : page + 1;
    const previousPage =
      page === 1
        ? page
        : page - 1;

    let finalResponse = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems: totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return finalResponse;
  }
}