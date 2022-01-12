import axios from "axios";
import { MAINURL } from "../..";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaWNrIiwiaWF0IjoxNjQxODY0ODU0LCJleHAiOjE2NDE4NzQ0NTQsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJyb2xlIjoiUk9MRV9ERUZBVUxUIn0.QgJCusPfk7Infxo3gPRr4ZqXyWcqod1uNVlkmbNztzc";

export function getPostApi() {
  const data = axios(`https://api-2021.dsm-pick.com/attendance`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
}

export function getPortfolioApi() {
  const data = axios(
    `${MAINURL}/portfolio/list?page=0&size=50&field=&sort=date,desc&query=&searchType=title`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return data;
}

export function getCommentApi(id: number) {
  const data = axios(`${MAINURL}/comments/${id}`);
  return data;
}
