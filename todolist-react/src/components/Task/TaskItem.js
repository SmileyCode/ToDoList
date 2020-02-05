import React, { Component } from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {deleteTask} from "../../actions/taskActions"

class TaskItem extends Component {
    onDeleteClick(task_id){
        this.props.deleteTask(task_id)
    }
    render() {
        const {task} = this.props;
        return (
            <div className="card mb-1 bg-light">
        
                                <div className="card-header text-primary">
                                    ID: {task.id}
                                </div>
                                <div className="card-body bg-light">
                                    <h5 className="card-title">{task.summary}</h5>
                                    <p className="card-text text-truncate ">
                                        {task.description}
                                    </p>
                                    <Link to={`/updatetask/${task.id}`} className="btn btn-primary">
                                        View / Update
                                    </Link>
        
                                    <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this,task.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
        );
    }
}

TaskItem.propTypes = {
    deleteTask: PropTypes.func.isRequired
};

export default connect(null, {deleteTask}) (TaskItem);