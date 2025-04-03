import { Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Route path="*">
        <Home />
      </Route>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
