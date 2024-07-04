import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logModel: mongoose.Model<any>;

  constructor() {
    const logSchema = new mongoose.Schema({
      method: String,
      url: String,
      statusCode: Number,
      responseTime: Number,
      createdAt: { type: Date, default: Date.now },
    });
    this.logModel = mongoose.model('Log', logSchema);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const log = new this.logModel({
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: duration,
      });
      log.save();
    });
    next();
  }
}
