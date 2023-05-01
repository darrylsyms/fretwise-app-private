import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from "@src/components/Icon";
import AppImageBackground from "@src/components/AppImageBackground";
import AppAvatar from "@src/components/AppAvatar";
import { CourseVideo } from "@src/components/Course/CourseStatus";
import { connect, useSelector } from "react-redux";
import { getCourseIncludes } from '../../../services/Course_Includes.service';
import { saveCourseIncludes } from '../../../state/actions/courseIncludes';
import { isTabletOrIPad } from "@src/utils";

const CourseHeaderItems = (props) => {

}

const mapStateToProps = (state) => ({
    config: state.config,
});

export default connect(mapStateToProps)(CourseHeaderItems);