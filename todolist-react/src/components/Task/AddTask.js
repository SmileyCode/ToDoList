import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addTask} from "../../actions/taskActions";
import classNames from "classnames";

class AddTask extends Component {
    constructor(){
        super();
        this.state = {
            summary : "",
            description : "",
            status : "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newTask = {
            summary : this.state.summary,
            description : this.state.description,
            status : this.state.status
        };
        //console.log(newTask);
        this.props.addTask(newTask, this.props.history);
    }

    render(){
        const {errors} = this.state;
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
                                className={classNames("form-control form-control-lg", {"is-invalid" : errors.summary})} 
                                name="summary" placeholder="Project Task summary" 
                                value={this.state.summary} 
                                onChange = {this.onChange}
                                />
                                {errors.summary && (
                                    <div className="invalid-feedback">{errors.summary}</div>
                                )}
                            </div>
                        
                            <div className="form-group">
                                <textarea className="form-control form-control-lg" placeholder="Description of your task" name="description" value={this.state.description} onChange = {this.onChange}></textarea>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" name="status" value={this.state.status} onChange = {this.onChange} >
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

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addTask}) (AddTask);