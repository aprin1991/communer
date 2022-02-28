import Layout from "@components/layout";
import App, { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "./../styles/globals.css";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
