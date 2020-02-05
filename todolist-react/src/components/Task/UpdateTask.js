import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTask, addTask} from "../../actions/taskActions";
import classnames from "classnames";

class UpdateTask extends Component {
    constructor(){
        super();
        this.state ={
            id: "",
            summary: "",
            description: "",
            status: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
        const {
            id,
            summary,
            description,
            status
        } = nextProps.task;

        this.setState({
            id,
            summary,
            description,
            status
        });
    }

    componentDidMount(){
        const {task_id} = this.props.match.params;
        this.props.getTask(task_id);
    }
    onChange(e){
        this.setState({ [e.target.name]:e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const updatedTask = {
            id: this.state.id,
            summary: this.state.summary,
            description: this.state.description,
            status: this.state.status
        };
        this.props.addTask(updatedTask, this.props.history);
    }
    render(){
        const { errors } = this.state;
        return (        
            <div className="addProjectTask">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/" className="btn btn-light">
                            Back to Board
                        </Link>
                        <h4 className="display-4 text-center">Add task</h4>
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className={classnames("form-control form-control-lg",{"is-invalid":errors.summary})} 
                                name="summary" placeholder="Project Task summary" 
                                value = {this.state.summary}
                                onChange={this.onChange}/>
                                {errors.summary && (
                                    <div className="invalid-feedback">{errors.summary}</div>
                                )}
                            </div>
                        
                            <div className="form-group">
                                <textarea className="form-control form-control-lg" placeholder="Description of your task" name="description" value={this.state.description} onChange={this.onChange}></textarea>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

UpdateTask.propTypes = {
    task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getTask: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    task: state.task.task,
    errors: state.errors
});

export default connect(mapStateToProps, { getTask, addTask }) (UpdateTask);