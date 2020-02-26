package ru.example.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.example.todolist.domain.Task;
import ru.example.todolist.domain.User;
import ru.example.todolist.exception.TaskIdException;
import ru.example.todolist.exception.TaskNotFoundException;
import ru.example.todolist.repository.TaskRepo;
import ru.example.todolist.repository.UserRepo;

import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    public Task saveOrUpdateTask(Task task, String username){
        if(task.getId() != null){
            this.findById(task.getId(),username);
        }
        User user = userRepo.findByUsername(username);
        task.setUser(user);
        if(task.getStatus() == null || task.getStatus().equals("")){
            task.setStatus("TO_DO");
        }
        return taskRepo.save(task);
    }

    public Iterable<Task> findAll(String username){
        User user = userRepo.findByUsername(username);
        return taskRepo.findAllByUser(user);
    }

    public Task findById(Long id, String username){
        Task task = taskRepo.findById(id).orElse(null);
        if(task == null){
            throw new TaskIdException("Task " + id + " doesn't exist");
        }

        if(!task.getUser().getUsername().equals(username)) {
            throw new TaskNotFoundException("Task " + id + " not found on your account");
        }
        return task;
    }

    public void delete(Long id, String username){
        taskRepo.delete(findById(id,username));
    }
}
