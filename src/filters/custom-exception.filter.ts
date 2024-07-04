import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from 'src/exceptions/custom.exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response
      .status(exception.getStatus())
      .json({
        statusCode: exception.getStatus(),
        message: exception.message,
        path: request.url,
      });
  }
}
