import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
	Breadcrumb, BreadcrumbItem, Button, 
	Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseurl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

// Validators
const minLength = len => val => val?.length >= len;
const maxLength = len => val => val?.length <= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = { isModalOpen: false };
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() { this.setState({ isModalOpen: !this.state.isModalOpen }); }

	handleSubmit(values) {
		// let stateMessage = `Current State is: ${JSON.stringify(values)}`;
        // console.log(stateMessage);
		// alert(stateMessage);
		// alert(JSON.stringify(values));
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
		this.toggleModal();
	}

	render() {
		return (
			<>
				<Button onClick={this.toggleModal} outline color='secondary'><span className='fa fa-pencil fa-lg'></span> Submit Comment</Button>
				<Modal isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={values => this.handleSubmit(values)}>
							<Row className='form-group'>
								<Col md={12}>
									<Label htmlFor='rating'>Rating</Label>
									<Control.select model='.rating' id='rating' 
										name='rating' className='form-control'>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option selected value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col md={12}>
									<Label htmlFor='author'>Your Name</Label>
									<Control.text model='.author' id='author' 
										name='author' className='form-control'
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15)
										}} />
									<Errors className='text-danger'
										model='.author'
										show='touched'
										messages={{
											minLength: 'Must be at least 3 characters-long',
											maxLength: 'Must not exceed 15 characters'
										}} />
								</Col>
							</Row>
							<Row className='form-group'>
								<Col md={12}>
									<Label htmlFor='comment'>Comment</Label>
									<Control.textarea rows='6' model='.comment' id='comment' 
										name='comment' className='form-control' />
								</Col>
							</Row>
							<Button type='submit' color='primary'>Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		);
	}
}

function RenderComments({ comments, postComment, dishId }) {
	if (comments != null) {
		let items = comments.map((comment) => (
			<Fade in>
				<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>– {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(Date.parse(comment.date))}</p>
				</li>
			</Fade>
		));

		return (
			<div className='col-12 col-md-5 m-1'>
				<h4>Comments</h4>
				<ul className='list-unstyled'>
					<Stagger in>
						{items}
					</Stagger>
				</ul>
				<CommentForm comments={comments}
					dishId={dishId} postComment={postComment} />
			</div>
		);
	}

	return <div></div>;
}

function RenderDish({dish}) {
	if (dish != null) {
		return (
			<div className='col-12 col-md-5 m-1'>
				<FadeTransform in
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}} >
					<Card>
						<CardImg src={`${baseURL}/${dish.image}`} alt={dish.name}/>
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			</div>
		);
	}

	return <div></div>;
}

const Dishdetail = props => {
	if (props.isLoading) {
		return (
			<div className='container'>
				<div className='row'>
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className='container'>
				<div className='row'>
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}

	if (props.dish != null) {
		return (
			<div className='container'>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to='/menu'>Menu</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>
						{props.dish.name}
					</BreadcrumbItem>
				</Breadcrumb>
				<div className='col-12'>
					<h3>{props.dish.name}</h3>
					<hr/>
				</div>
				<div className='row'>
					<RenderDish dish={props.dish}/>
					<RenderComments comments={props.comments}
						postComment={props.postComment}
						dishId={props.dish.id} />
				</div>
			</div>
		);
	}
	
	return (
		<div className='container'>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to='/menu'>Menu</Link>
				</BreadcrumbItem>
				<BreadcrumbItem active>
					Invalid Dish
				</BreadcrumbItem>
			</Breadcrumb>
			<div className='col-12'>
				<h3>Invalid Dish</h3>
				<hr/>
			</div>
			<div className='row'>
				Invalid Dish!
			</div>
		</div>
	);
};

export default Dishdetail;