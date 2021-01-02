import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{

    render(){
        const dish = this.props.dish;
        if(dish != null){
            const comments = dish.comments.map((comment) => {
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day:'2-digit'}).format(new Date( Date.parse(comment.date)))}</p>
                    </div>)
                    });
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h2>Comments</h2>
                            {comments}
                        </div>
                    </div> 
                </div>
                
            );
        }
        else{
            return(<div></div>);
        }
            
    }
}

export default DishDetail;