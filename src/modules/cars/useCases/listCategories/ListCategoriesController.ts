import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listOfCategories = await this.listCategoriesUseCase.execute();

    return response.json(listOfCategories);
  }
}
