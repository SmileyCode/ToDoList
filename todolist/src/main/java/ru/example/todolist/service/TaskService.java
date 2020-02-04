package ru.example.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.example.todolist.domain.Task;
import ru.example.todolist.repository.TaskRepo;

import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    public Task saveOrUpdateTask(Task task){
        if(task.getStatus() == null || task.getStatus().equals("")){
            task.setStatus("TO_DO");
        }
        return taskRepo.save(task);
    }

    public Iterable<Task> findAll(){
        return taskRepo.findAll();
    }

    public Task findById(Long id){
        return taskRepo.findById(id).orElse(new Task());
    }

    public void delete(Long id){
        Task task = taskRepo.findById(id).orElse(new Task());
        taskRepo.delete(task);
    }
}
