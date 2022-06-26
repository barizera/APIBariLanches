import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Server is running!! 🏃‍♂️ \n Please check at http://localhost:3005/docs for documentation.`;
  }
}
