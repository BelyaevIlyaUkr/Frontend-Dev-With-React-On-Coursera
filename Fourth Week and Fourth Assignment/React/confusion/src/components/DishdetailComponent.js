import React,{ Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle , Breadcrumb, BreadcrumbItem, Button, Row, Col, Label,
         Modal,ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil">
                            Submit Comment
                        </span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Label htmlFor="rating">Rating</Label>
                                <Row className="form-group">
                                    <Col md={{ size: 10 }}>
                                        <Control.select model=".rating" name="rating" placeholder='1' defaultValue={1}
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Label htmlFor="author">Your Name</Label>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Label htmlFor="comment">Comment</Label>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.textarea model=".comment" rows ="6" id="comment" name="comment"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 10 }}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}
function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments , postComment, dishId}) {
    const readyComments = comments.map((commment) => {
        return (
            <li key={commment.id}>
                <p>{commment.comment}</p>
                <p>-- {commment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(commment.date)))}</p>
            </li>
        );
    })

    if (comments != null) {
        return (
            <div className="container">
                <div className="row">
                    <header>
                        <h4>Comments</h4>
                    </header>
                    <ul className="list-unstyled">
                        {readyComments}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
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

const DishDetail = (props) => {
    if (props.isLoading) {
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
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
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