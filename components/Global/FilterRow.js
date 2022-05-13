import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import FilterListHeaderInner from "@src/components/Filter/FilterListHeader"; //Use BuddyBoss component for generating filter row
const FilterRow = (props) => {

   const courseCount = useSelector((state) => state.courses.all.count); //Get courses count from redux

   const {
       details,
       filter,
       initialTab,
       filters,
       subfilters,
       activeSubFilters,
       global,
       colors,
       t,
       labels,
       filterType } = props;

     const [activeFilter, setActiveFilter] = useState(initialTab || filters[0]);

     //Pass all props required by FilterListHeaderInner
     return <FilterListHeaderInner
       {...{
         showFilterArrow: false,
         details,
         disableFilter: false,
         disableSubFilters: false,
         count: filterType === "courses" ? courseCount : undefined,
         filter: activeFilter,
         subfilters,
         activeSubFilters,
         global,
         colors,
         t,
         labels,
         filterType,
         containerStyle: {
           backgroundColor: colors.bodyFrontBg
         }
       }}
     />
}

export default FilterRow;