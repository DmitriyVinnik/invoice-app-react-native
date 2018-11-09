import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

type OwnProps = RouteComponentProps

type Props = OwnProps

const NotFoundPage: React.SFC<Props> = (props) => {
    const {location} = props;

    return (
        <div>
            <h3>
                404 - Not found!
            </h3>
            <p>
                No match for <code>{location.pathname}</code>
            </p>
        </div>
    );
};

export default NotFoundPage;
