package ru.example.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.example.todolist.domain.Task;
import ru.example.todolist.service.ErrorService;
import ru.example.todolist.service.TaskService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class MainController {
    @Autowired
    private TaskService taskService;

    @Autowired
    private ErrorService errorService;

    @PostMapping("")
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task, BindingResult result, Principal principal){
        ResponseEntity<?> hasErrors = errorService.ErrorValidation(result);
        if(hasErrors!=null) return hasErrors;

        Task newTask = taskService.saveOrUpdateTask(task, principal.getName());
        return new ResponseEntity<Task>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Task> getAllTasks(Principal principal){
        return taskService.findAll(principal.getName());
    }

    @GetMapping("/{taskid}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskid, Principal principal){
        Task task = taskService.findById(taskid, principal.getName());
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{taskid}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskid, Principal principal){
        taskService.delete(taskid, principal.getName());
        return new ResponseEntity<String>("Task deleted", HttpStatus.OK);
    }
}
