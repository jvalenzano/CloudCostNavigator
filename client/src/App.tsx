import { Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";

// Create a base location hook for GitHub Pages
const useHashLocation = () => {
  const [location, setLocation] = React.useState(
    window.location.pathname.replace("/CloudCostNavigator", "") || "/"
  );

  React.useEffect(() => {
    // Listen for URL changes
    const handleLocationChange = () => {
      setLocation(
        window.location.pathname.replace("/CloudCostNavigator", "") || "/"
      );
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Return the location and a function to change it
  return [
    location,
    (to) => {
      window.history.pushState(null, "", `/CloudCostNavigator${to}`);
      setLocation(to);
    },
  ];
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <Route path="*">
          <Home />
        </Route>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
