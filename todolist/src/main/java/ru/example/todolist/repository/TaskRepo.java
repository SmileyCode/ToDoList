package ru.example.todolist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.example.todolist.domain.Task;
import ru.example.todolist.domain.User;

@Repository
public interface TaskRepo extends CrudRepository<Task, Long> {
    Task getById(Long id);

    Iterable<Task> findAllByUser(User user);
}
