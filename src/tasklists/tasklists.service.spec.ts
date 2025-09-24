import { Test, TestingModule } from '@nestjs/testing';
import { TasklistsService } from './tasklists.service';

describe('TasklistsService', () => {
  let service: TasklistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasklistsService],
    }).compile();

    service = module.get<TasklistsService>(TasklistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
