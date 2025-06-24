import { TasksService } from './tasks.service';
import { TaskStatus } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('deve criar uma nova tarefa', () => {
    const task = service.create({ title: 'Testar', description: 'Criar tarefa' });

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Testar');
    expect(task.completed).toBe(false);
    expect(task.status).toBe(TaskStatus.PENDING);
  });

  it('deve listar todas as tarefas', () => {
    service.create({ title: 'Tarefa 1', description: 'Descrição 1' });
    service.create({ title: 'Tarefa 2', description: 'Descrição 2' });

    const tasks = service.findAll();
    expect(tasks.length).toBe(2);
  });

  it('deve atualizar o status da tarefa', () => {
    const task = service.create({ title: 'Para concluir', description: '...' });

    const updated = service.updateStatus(task.id, { completed: true });
    expect(updated.completed).toBe(true);
    expect(updated.status).toBe(TaskStatus.COMPLETED);
  });

  it('deve remover uma tarefa existente', () => {
    const task = service.create({ title: 'Excluir', description: '...' });

    service.remove(task.id);
    expect(service.findAll().length).toBe(0);
  });

  it('deve lançar erro ao atualizar tarefa inexistente', () => {
    expect(() => {
      service.updateStatus('id-invalido', { completed: true });
    }).toThrow();
  });

  it('deve lançar erro ao remover tarefa inexistente', () => {
    expect(() => {
      service.remove('id-invalido');
    }).toThrow();
  });
});
