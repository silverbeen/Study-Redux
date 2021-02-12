import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_actions/userAction";

function LandingPage(props) {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(logoutUser())
      .then((res) => {
        console.log(res);
        if (res.payload.success) {
          props.history.push("/login");
        } else {
          alert("로그아웃에 실패하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

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
