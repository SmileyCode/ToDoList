import React, { Component } from 'react';
import {Link} from "react-router-dom";
import TaskItem from './Task/TaskItem';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/taskActions";

class Board extends Component {
    componentDidMount(){
        this.props.getBacklog();
    }
    render(){
        const {tasks} = this.props.tasks

        let BoardContent;
        let todoItems = []
        let inProgressItems = []
        let doneItems = []

        const BoardAlgorithm = project_tasks => {
            if(tasks.length < 1){
                return (
                    <div className="alert alert-info text-center" role="alert">No tasks on this board</div>
                )
            }
            else{
                const tasksMap = tasks.map(task => (
                    <TaskItem key={tasks.id} task={task} />
                ));

                for(let i=0; i<tasksMap.length; i++){
                    if(tasksMap[i].props.task.status === "TO_DO"){
                        todoItems.push(tasksMap[i])
                    }
                    else if(tasksMap[i].props.task.status === "IN_PROGRESS"){
                        inProgressItems.push(tasksMap[i])
                    }
                    else if(tasksMap[i].props.task.status === "DONE"){
                        doneItems.push(tasksMap[i])
                    }
                }

                return (
                    <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
                                    </div>
                                </div>
            
                                {todoItems}
            
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-primary text-white">
                                        <h3>In Progress</h3>
                                    </div>
                                </div>
                                {inProgressItems}
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-success text-white">
                                        <h3>Done</h3>
                                    </div>
                                </div>
                                {doneItems}
                            </div>
                        </div>
                    </div>
                    </React.Fragment>
                )
            }
        }

        BoardContent = BoardAlgorithm(tasks);
        return (
            <div className="container">
                <Link to="/addtask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Add task</i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}

Board.propTypes = {
     getBacklog: PropTypes.func.isRequired,
     tasks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tasks: state.tasks
})

export default connect(mapStateToProps,{getBacklog}) (Board);