import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderComments({comments}) {
	if (comments != null) {
		let items = comments.map((comment) => (
			<li key={comment.id}>
				{comment.comment}<br/>
				– {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(Date.parse(comment.date))}
			</li>
		));

		return (
			<div class='col-12 col-md-5 m-1'>
				<h4>Comments</h4>
				<ul class='list-unstyled'>
					{items}
				</ul>
			</div>
		);
	}

	return <div></div>;
}

function RenderDish({dish}) {
	if (dish != null) {
		return (
			<div class='col-12 col-md-5 m-1'>
				<Card>
					<CardImg src={dish.image} alt={dish.name}/>
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}

	return <div></div>;
}

const Dishdetail = props => {
	if (props.dish != null) {
		return (
			<div className='container'>
				<div class='row'>
					<RenderDish dish={props.dish}/>
					<RenderComments comments={props.dish.comments}/>
				</div>
			</div>
		);
	}
	
	return <div></div>;
}

export default Dishdetail;