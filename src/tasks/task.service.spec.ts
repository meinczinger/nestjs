import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'test_user',
  id: 'someId',
  password: 'somePwd',
  tasks: [],
};

describe('Task service', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const tasks = await tasksService.getTasks(null, mockUser);
      expect(tasks).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksService.getTaskById and returns the result', async () => {
      const mockTask = {
        tittle: 'title',
        description: 'desc',
        id: 'id',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const task = await tasksService.getTaskById('someId', mockUser);
      expect(task).toEqual(mockTask);
    });
    it('calls TasksService.getTaskById and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
