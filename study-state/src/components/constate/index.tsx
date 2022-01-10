import { useState } from "react";
import constate from "constate";
import { userType } from "./interface/userType";

function useUser() {
  const [user, setUser] = useState<userType>({
    username: "",
    age: "",
  });
  return { user, setUser };
}

const [UserProvider, useUserValue, useUserUpdate] = constate(
  useUser, // provider
  (value) => value.user, // useUserValue
  (value) => value.setUser // useUserUpdate
);

function UserInfo() {
  const user = useUserValue();
  if (!user.username && !user.age) return <>사용자 정보가 없습니다.</>;
  return (
    <>
      <div className="user-item">이름 : {user.username}</div>
      <div className="user-item">나이 : {user.age}</div>
    </>
  );
}

function Authenticate() {
  const user = useUserValue();
  const setUser = useUserUpdate();

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <input
        type="text"
        name="username"
        value={user?.username}
        onChange={(e) => onChange(e)}
      />
      <input
        type="text"
        name="age"
        value={user?.age}
        onChange={(e) => onChange(e)}
      />
    </>
  );
}

const Constate = () => {
  return (
    <UserProvider>
      <UserInfo />
      <Authenticate />
    </UserProvider>
  );
};

export default Constate;
