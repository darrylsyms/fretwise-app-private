import React from 'react';
import GroupsScreen from "@src/containers/Custom/GroupsScreen";

const GroupsScreeen = (props) => {

 return (
       <GroupsScreen {...props} 
       showSearch={false}
       screenTitle="Groups" 
       hideFilters={true} 
       hideTitle={false} 
       hideNavigationHeader={false} 
       />
)
}

GroupsScreeen.navigationOptions = {
 header: null
}

export default GroupsScreeen;