import React from "react";
import { Constate, ReactQuery } from "./components";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Constate />
        <ReactQuery />
      </QueryClientProvider>
    </>
  );
}

export default App;
