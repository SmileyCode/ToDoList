package ru.example.todolist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.example.todolist.domain.Task;

@Repository
public interface TaskRepo extends CrudRepository<Task, Long> {
    Task getById(Long id);
}
