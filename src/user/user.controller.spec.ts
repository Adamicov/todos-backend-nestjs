import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return users', async () => {
    const user = new User();
    user.name = 'Michal';

    const result = new Promise<User[]>(resolve => {
      resolve([user]);
    });
    jest.spyOn(service, 'getAll').mockImplementation(() => result);
    expect(await controller.getUsers()).toBe(result);
  });
});
