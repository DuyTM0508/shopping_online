import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Page404 from "@/pages/Page404";
import routes from "@/routes/routes";

import PrivateRoute from "@/components/PrivateRoute";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/loadingScreen";
import {
  toastBody,
  toastCloseIcons,
  toastContainer,
  toastIcons,
} from "./helpers/toast";
import i18n from "./i18n/config";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { useGet } from "./stores/useStores";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  //! State
  const loadingApp = useGet("loadingApp");

  //! Function

  //! Render
  const renderContent = () => {
    return (
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={`${route.path}-layout`}
                path={route.path}
                element={
                  route.isPrivateRoute ? (
                    <PrivateRoute>
                      <route.layout>
                        <Outlet />
                      </route.layout>
                    </PrivateRoute>
                  ) : (
                    <route.layout>
                      <Outlet />
                    </route.layout>
                  )
                }
              >
                {route.routeChild.map((child, idx) => {
                  return (
                    <Route
                      key={`${child.path}-${idx}`}
                      path={child.path}
                      element={
                        <Suspense fallback={<span>Loading...</span>}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            {child.isPrivateRoute ? (
                              <PrivateRoute>
                                <child.component />
                              </PrivateRoute>
                            ) : (
                              <child.component />
                            )}
                          </ErrorBoundary>
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <AuthenticationProvider>
          {renderContent()}
          <ToastContainer
            theme="light"
            toastClassName={(context) =>
              toastContainer[context?.type || "default"] +
              " relative flex justify-between items-center py-1 rounded pl-4 pr-1 gap-3 py-1 border top-14"
            }
            bodyClassName={(context) =>
              toastBody[context?.type || "default"] +
              " flex rounded items-center text-xs font-normal gap-1"
            }
            icon={(context) => (
              <img src={toastIcons[context.type || "default"]} alt={"icons"} />
            )}
            closeButton={(context) => (
              <img
                src={toastCloseIcons[context.type || "default"]}
                alt={"icons"}
                onClick={context.closeToast}
              />
            )}
          />
          {loadingApp && <LoadingScreen />}
        </AuthenticationProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
