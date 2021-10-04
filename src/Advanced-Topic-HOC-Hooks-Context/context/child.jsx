import React from "react";
import UserContext from "./user-context";

class Child extends React.Component {
  /*Thid Way to get context data: data available in this.context */
  // static contextType = UserContext;
  componentDidMount() {
    console.log("Context: ", this.context);
  }

  render() {
    return (
      <React.Fragment>
        {/* First Way to get context data: function as a child (Lamda expression)
        <UserContext>
          {(userContext) => <div>Child - {userContext.name}</div>}
        </UserContext> */}
        <div>
          Child -{this.context.currentUser ? this.context.currentUser.name : ""}
        </div>
      </React.Fragment>
    );
  }
}

/*Second Way to get context data: data available in Child.context */
Child.contextType = UserContext;

export default Child;
