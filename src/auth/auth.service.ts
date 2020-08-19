import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(loginDto) {
    const user = await this.userService.findUserByName(loginDto.name);
  }
}
