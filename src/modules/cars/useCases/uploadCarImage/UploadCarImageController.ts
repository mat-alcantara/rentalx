import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const fileNames = images.map(file => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    await uploadCarImageUseCase.execute({ car_id: id, images_name: fileNames });

    return response.status(201).send();
  }
}
