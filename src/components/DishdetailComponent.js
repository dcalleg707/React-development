import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

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

const RenderComents = ({comments}) => {
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
        </div>
    )

}

const DishDetail = (props) => {
    const dish = props.dish;
    if(dish != null){   
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
                    <RenderComents comments={props.comments}/>
                </div> 
            </div>  
        );
    }
    else{
        return(<div></div>);
    }
}


export default DishDetail;