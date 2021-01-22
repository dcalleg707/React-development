import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import Loading from './LoadingComponent'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm  extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            dish: props.dish
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    

    handleSubmit(values){
        if(values.rating == undefined){
            alert("You must choose a rating");
        }
        else{
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
        }
        
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                <span className="fa fa-lg"></span> Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        innerRef={(input) => this.rating = input} className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" id='name' name='name'
                                    innerRef={(input) => this.name = input} className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors 
                                    className="text-danger"
                                    model=".name" 
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less',
                                    }}></Errors>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6" 
                                            className="form-control" innerRef={(input) => this.comment = input}
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors 
                                        className="text-danger"
                                        model=".comment" 
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}></Errors>
                                </FormGroup>
                                <Button type='submit' value='submit' className="bg-primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>
            
        );
    }
}



function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );  
}

const RenderComents = ({comments, addComment, dishId}) => {
    const coms = comments.map((comment) => {
        return(
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day:'2-digit'}).format(new Date( Date.parse(comment.date)))}</p>
            </div>)
    });
    return(
        <div className="col-12 col-md-5 m-1">
            <h2>Comments</h2>
            {coms}
            <CommentForm dishId={dishId} addComment={addComment}/> 
        </div>
    )

}

const DishDetail = (props) => {
    const dish = props.dish;

    if (props.isLoading){
        return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    }
    else if (props.errMess){
        return(
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
        );
    }
    else if(dish != null){   
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem Active>
                            {dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish}/>
                    <RenderComents comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}/>
                </div>
            </div>  
        );
    }
    else{
        return(<div></div>);
    }
}


export default DishDetail;