import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth.config';

@Controller('api/auth')
export class AuthController {
  @All('/*')
  async betterAuthHandler(@Req() req: Request, @Res() res: Response): Promise<void> {
    const handler = toNodeHandler(auth); 
    await handler(req, res);
  }
}