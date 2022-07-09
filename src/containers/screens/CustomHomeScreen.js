import React from 'react';
import HomeContent from '../content/HomeScreenContent';
import ScreenContainer from '../IndexScreenTemplate';
import { getCourses } from '../../services/Courses.service';
import { saveCourses } from '../../../src/state/actions/courses';
import { getHotTopics } from '../../services/Hot_Topics.service';
import { saveHotTopics } from '../../../src/state/actions/hotTopics';
import { getWelcomeMessages } from '../../services/Welcome_Messages.service';
import { saveWelcomeMessages } from '../../../src/state/actions/welcomeMessages';

const CustomHomeScreen = () => {
    return(
        <ScreenContainer 
        headerLogo={false} // TODO - make true when you've fixed the constant render issues
        content={<HomeContent />}
        title={"Home"}
        getData={getCourses}
        getData2={getHotTopics}
        getData3={getWelcomeMessages}
        saveData={saveCourses}
        saveData2={saveHotTopics}
        saveData3={saveWelcomeMessages}
        />
    )
}

CustomHomeScreen.navigationOptions = {
    header: null
};

export default CustomHomeScreen;