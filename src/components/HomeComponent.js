import React from 'react';
import { Card, CardImg, CardText, CardBody, 
    CardTitle, CardSubtitle } from 'reactstrap';
import { baseURL } from '../shared/baseurl';
import { Loading } from './LoadingComponent';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return <h4>{errMess}</h4>;
    }
    
    return(
        <Card>
			<CardImg src={`${baseURL}/${item.image}`} alt={item.name}/>
			<CardBody>
				<CardTitle>{item.name}</CardTitle>
				{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
				<CardText>{item.description}</CardText>
			</CardBody>
		</Card>
    );

}

function Home(props) {
    console.log(props);

    if (props.dish && props.promotion && props.leader)
        return(
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.dish}
                            isLoading={props.dishesLoading}
                            errMess={props.dishesErrMess}
                            />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.promotion} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.leader} />
                    </div>
                </div>
            </div>
        );

    return <></>;
}

export default Home;