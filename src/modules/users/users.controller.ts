import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from './user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async create(@Body() data: UserCreateDTO) {
    const result = await this.createUserUseCase.execute(data);
    return result;
  }
}
