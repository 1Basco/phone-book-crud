import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MainLayout } from "./layouts/main"
import { MainNavigator } from "./navigator"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()
function App() {

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <MainNavigator />
        </MainLayout>
      </QueryClientProvider>
    </>
  )
}

export default App
