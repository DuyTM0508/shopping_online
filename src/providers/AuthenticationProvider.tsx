import { showError, showSuccess } from "@/helpers/toast";
import { UserInfo } from "@/interfaces/user";
import httpService from "@/services/httpService";
import authenticationService from "@/services/modules/authentication/authenticationService";
import CartService from "@/services/modules/cart/cartService";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface LoginProps {
  username: string;
  password: string;
}

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: UserInfo | null;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
  updateUser: (user: UserInfo) => void;
  // isAdmin: boolean;
  // isAppManager: boolean;
  // isUser: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  // isAdmin: false,
  // isAppManager: false,
  // isUser: false,
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [token, setToken] = useState(httpService.getTokenStorage());
  const [user, setUser] = useState<UserInfo | null>(
    httpService.getUserStorage()
  );
  const [sessionId, setSessionId] = useState(httpService.getSessionIdStorage());
  const [isLogging, setIsLogging] = useState(false);
  const requestApiLogin = authenticationService.postLogin;
  const requestSessionId = CartService.getSessionId;
  const updateUser = (user: UserInfo) => {
    setUser(user);
  };

  //! Function
  const login = useCallback(
    ({ username, password }: LoginProps) => {
      setIsLogging(true);

      if (username && password) {
        return new Promise((resolve, reject) => {
          (async () => {
            try {
              const response = await requestApiLogin({
                Email: username,
                Password: password,
              });
              setToken(response.data.Object.Token);
              setUser(response.data.Object);
              httpService.attachTokenToHeader(response.data.Object.Token);
              httpService.saveTokenStorage(response.data.Object.Token);
              httpService.saveUserStorage(response.data.Object);
              await CartService.postStartSession();
              const sessionId = await requestSessionId();
              setSessionId(sessionId.data);
              httpService.saveSessionIdStorage(sessionId.data);
              setIsLogging(false);
              showSuccess("Login successfully!");
              resolve(response);
            } catch (error) {
              showError("Login failed!");
              reject(error);
            }
          })();
        });
      } else {
        return null;
      }
    },
    [requestApiLogin]
  );

  const logout = useCallback(() => {
    httpService.clearStorage();
    window.sessionStorage.clear();
    window.location.reload();
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isLogging,
      isLogged: !!user && !!token,
      user,
      logout,
      login,
      sessionId,
      updateUser,
      // isAdmin: !!user?.roles?.includes(PERMISSION_ENUM.ADMIN),
      // isAppManager: !!user?.roles?.includes(PERMISSION_ENUM.APP_MANAGER),
      // isUser: !!user?.roles?.includes(PERMISSION_ENUM.USER),
    };
  }, [login, logout, user, token, isLogging, sessionId]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
