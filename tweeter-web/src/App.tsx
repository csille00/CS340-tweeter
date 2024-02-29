import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import {User, Status} from "tweeter-shared";
import ItemScroller from "./components/mainLayout/ItemScroller";
import useUserInfoHook from "./components/userInfo/UserInfoHook";
import {FollowingPresenter} from "./presenter/FollowingPresenter";
import {UserItemView} from "./presenter/UserItemPresenter";
import {FollowersPresenter} from "./presenter/FollowersPresenter";
import {StatusItemView} from "./presenter/StatusItemPresenter";
import {FeedPresenter} from "./presenter/FeedPresenter";
import {StoryPresenter} from "./presenter/StoryPresenter";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = useUserInfoHook();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route path="feed"
               element={
                <ItemScroller<Status>
                    key={1}
                    presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)}
                    componentGenerator={(item: Status) => <StatusItem status={item}/>}
                />
            }
        />
        <Route path="story"
               element={
                <ItemScroller<Status>
                    key={2}
                    presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)}
                    componentGenerator={(item: Status) => <StatusItem status={item}/>}
                />
            }
        />
        <Route
          path="following"
          element={
              <ItemScroller<User>
                  key={3}
                  presenterGenerator={(view: UserItemView) => new FollowingPresenter(view)}
                  componentGenerator={(item: User) => <UserItem value={item}/>}
              />
          }
        />
        <Route
          path="followers"
          element={
              <ItemScroller<User>
                  key={4}
                  presenterGenerator={(view: UserItemView) => new FollowersPresenter(view)}
                  componentGenerator={(item: User) => <UserItem value={item}/>}
              />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
