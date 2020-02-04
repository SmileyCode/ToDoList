# API documentation
## Get all tasks
To get all tasks you can use this:
```
GET /api/todo/all
```
The response will then be:
```
[
    {
        "id": 1,
        "summary": "first task",
        "description": "do the finishing",
        "status": "TO_DO"
    },
    {
        "id": 3,
        "summary": "second task",
        "description": "delete it",
        "status": "TO_DO"
    }
]
```
## Add or update task
To add task you can use:
```
POST /api/todo
```
With payload:
```
{
	"summary" : "My first task",
	"description" : "This is description of my task",
	"status": "TO_DO"
}
```
If you'll leave "summary" blank you'll get an error:
```
{
    "summary": "Summary can't be blank"
}
```
To update any tasks you need to add an id to your payload:
```
{
	"id" : "1",
	"summary" : "My first task",
	"description" : "This is updated task",
	"status": "TO_DO"
}
```
## Delete task
To delete task you can use
```
DELETE /api/todo/{id}
```
Where {id} is the id of task you want to delete. In response you'll get:
```
Task deleted
```