import { Test, TestingModule } from '@nestjs/testing';
import { UserManagerUseCase } from '../src/useCases/userManager.useCase';

describe('UserService', () => {
  let UserManager: UserManagerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserManagerUseCase],
    }).compile();

    UserManager = module.get<UserManagerUseCase>(UserManagerUseCase);
  });

  it('should be defined', () => {
    expect(UserManager).toBeDefined();
  });
});