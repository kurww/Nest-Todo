import { Test, TestingModule } from '@nestjs/testing';
import { TasklistsController } from './tasklists.controller';
import { TasklistsService } from './tasklists.service';

describe('TasklistsController', () => {
  let controller: TasklistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasklistsController],
      providers: [TasklistsService],
    }).compile();

    controller = module.get<TasklistsController>(TasklistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
