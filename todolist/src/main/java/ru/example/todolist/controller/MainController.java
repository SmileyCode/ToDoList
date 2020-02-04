package ru.example.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.example.todolist.domain.Task;
import ru.example.todolist.service.TaskService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class MainController {
    @Autowired
    TaskService taskService;

    @PostMapping("")
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task, BindingResult result){
        if(result.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            for(FieldError error : result.getFieldErrors()){
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String,String>>(errors, HttpStatus.BAD_REQUEST);
        }
        Task newTask = taskService.saveOrUpdateTask(task);
        return new ResponseEntity<Task>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Task> getAllTasks(){
        return taskService.findAll();
    }

    @GetMapping("/{taskid}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskid){
        Task task = taskService.findById(taskid);
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{taskid}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskid){
        taskService.delete(taskid);
        return new ResponseEntity<String>("Task deleted", HttpStatus.OK);
    }
}
