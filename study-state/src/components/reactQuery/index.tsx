import React, { useEffect, useState } from "react";
import { QueryClient, useMutation, useQueries, useQuery } from "react-query";
import { StructuredType } from "typescript";
import { getPortfolioApi, getPostApi } from "../../lib/api/post";

const ReactQuery = () => {
  const [item, setItem] = useState();
  const [inputs, setInputs] = useState<{ state: string; term: string }>({
    state: "",
    term: "",
  });
  const newsQuery = useQuery(["news", item], () => getPostApi());
  const portfolioQuery = useQuery(["portfolio"], () => getPortfolioApi());

  const results = useQueries([
    { queryKey: ["posts", 1], queryFn: getPostApi },
    { queryKey: ["poset", 2], queryFn: getPortfolioApi , retry : 10},
  ]);

  console.log(results);

  const queryClient = new QueryClient();

  const mutation = useMutation(["update"], {
    onSuccess: (inputs) => {
      queryClient.setQueryData(["news"], inputs);
      // 쿼리 무효화(Invalidations) : 키를 갖는 캐시를 무효화시키며, React Query가 데이터를 다시 불러오도록 합니다.
      queryClient.invalidateQueries("news");
    },
  });

  const onSubmit = (e: any, inputs: any) => {
    e.preventDefault();

    mutation.mutate(inputs, {
      onSuccess: () => {
        alert("성공!!");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    console.log(portfolioQuery?.data?.data?.portfolio_list);
  }, []);

  const article = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {newsQuery?.data?.data.map((item: any, idx: number) => (
          <span key={idx}>
            {item?.state} {item.term}
          </span>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={(e) => onSubmit(e, inputs)}>
      <div>{article()}</div>
      <input
        type="text"
        onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
      />
      <input
        type="text"
        onChange={(e) => setInputs({ ...inputs, term: e.target.value })}
      />
      <button>등록</button>
    </form>
  );
};

export default ReactQuery;
