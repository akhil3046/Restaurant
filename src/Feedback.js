import React, { useEffect, useState } from "react";
import './Feedback.css';
import { useLocation } from "react-router-dom";

function Feedback() {
    const location = useLocation();
    const [restaraunt, setRestaurant] = useState();


    useEffect(() => {
        console.log(location.state.restaurant);
        setRestaurant(location?.state)
    }, [])

    return (
        <React.Fragment>
            <div className="d-flex vh-100 justify-content-center">
                <div className="container form-title">
                    <h1>{restaraunt?.restaurant.name} Feedback Questions</h1>
                    <div style={{margin: '10px'}}>
                        {
                            restaraunt?.restaurant.questions.map((question, index) => <div key={index} style={{margin: '10px 0'}}> <strong>.</strong> {question}</div>)
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Feedback;