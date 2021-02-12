import React from "react";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  const onClickHandler = () => {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >

      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
