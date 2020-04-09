import React from 'react';
import { Card,CardImg,CardBody,CardText,CardTitle } from 'reactstrap';


    function RenderDish({dish}){
        if (dish != null){
            return(
                <div className = "container">
                    <div className = "row">
                        <Card>
                            <CardImg width = "100%" src = {dish.image} alt = {dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody> 
                        </Card>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        const readyComments = comments.map((commment)=> {
            return(
                <li key = {commment.id}>
                    <p>{commment.comment}</p>
                    <p>-- {commment.author} , {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(commment.date)))}</p>
                </li>
            );
        })

        if (comments != null){
            return (
                <div className = "container">
                    <div className = "row">
                    <header>
                        <h4>Comments</h4>
                    </header>
                    <ul className="list-unstyled">
                        {readyComments}
                    </ul>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div></div>
            )
        }
    } 
    
    const DishDetail = (props) => {
        if (props.dish != null){
            return(
                <div className = "container">
                    <div className = "row">
                        <div className = "col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className = "col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

export default DishDetail;