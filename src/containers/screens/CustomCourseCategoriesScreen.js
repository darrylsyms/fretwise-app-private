import React from 'react';
import CourseCategoriesContent from '../content/CourseCategoriesContent';
import ScreenContainer from '../IndexScreenTemplate';
import { getCourseCategories } from "../../services/Course_Categories.service";
import { saveCourseCategories } from '../../../src/state/actions/courseCategories';

const CustomCourseCategoriesScreen = () => {
    return(
        <ScreenContainer 
        headerLogo={false}
        content={<CourseCategoriesContent />}
        title={"Course Categories"}
        getData={getCourseCategories}
        saveData={saveCourseCategories}
        />
    )
}

CustomCourseCategoriesScreen.navigationOptions = {
    header: null
};

export default CustomCourseCategoriesScreen;