import { Fragment } from 'react';
import Congo from '../../assets/img/survey1.jpg';

const PostSurveyStatic = () => {
    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img className="img-fluid imgWidthSize" src={Congo}></img>
                </div>
                <div>
                    <h4 className="common-flex">
                        Please ensure all the student teams submit the ideas to
                        fill the post survey.
                    </h4>
                    <h4 className="common-flex">
                        Certificate will be generated once you complete the post
                        survey.
                    </h4>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
