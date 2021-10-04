import React from "react";
import UserContext from "./user-context";

class Child extends React.Component {
  /*Thid Way to get context data: data available in this.context */
  static context = UserContext;
  componentDidMount() {
    console.log("Context: ", this.context);
  }

  render() {
    return (
      <React.Fragment>
        <UserContext>
          {/*First Way to get context data: function as a child (Lamda expression)*/}
          {(userContext) => <div>Child - {userContext.name}</div>}
        </UserContext>
      </React.Fragment>
    );
  }
}

/*Second Way to get context data: data available in Child.context */
Child.context = UserContext;

export default Child;
