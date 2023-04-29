import React from 'react';
import Skeleton from './SkeletonLoader';

const LessonVideoPlaceholder = (props) => {

    return (
            <Skeleton
                height={props.height}
                width={props.width}
            />
    );
};

export default LessonVideoPlaceholder;