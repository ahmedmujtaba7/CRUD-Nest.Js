import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const responseBody = exception.getResponse();
        message =
          typeof responseBody === 'string'
            ? responseBody
            : (responseBody as any).message || message;
      }
  
      response.status(status).json({
        success: false,
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }
