import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {
	renderComments(comments) {
		if (comments != null) {
			let items = comments.map((comment) => (
				<li key={comment.id}>
					{comment.comment}<br/>
					– {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(Date.parse(comment.date))}
				</li>
			)); // Need to format date

			return (
				<ul class='list-unstyled'>
					{items}
				</ul>
			);
		}

		return <div></div>;
	}

	renderDish(dish) {
		if (dish != null) {
			return (
				<Card>
					<CardImg src={dish.image} alt={dish.name}/>
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			);
		}

		return <div></div>;
	}

	render() {
		if (this.props.dish != null) {
			return (
				<div className='container'>
					<div class='row'>
						<div class='col-12 col-md-5 m-1'>
							{this.renderDish(this.props.dish)}
						</div>
						<div class='col-12 col-md-5 m-1'>
							<h4>Comments</h4>
							{this.renderComments(this.props.dish.comments)}
						</div>
					</div>
				</div>
			);
		}
		
		return <div></div>;
	}
}

export default Dishdetail;