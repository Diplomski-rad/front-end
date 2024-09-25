import "./App.css";
import Home from "./components/shared/home/home";
import Navbar from "./components/shared/navbar/navbar";
import VideoPlayer from "./components/video_player/video_player";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./infrastructure/auth/login/login";
import Registration from "./infrastructure/auth/registration/registration";
import CourseForm from "./components/author/create-course/course-form/course-form";
import MyCoursesDashboard from "./components/author/my-courses/my-courses-dashboard/my-courses-dashboard";
import AddVideo from "./components/author/create-course/add-video/add-video";
import CourseDetails from "./components/author/my-courses/course-details/course-details";
import LandingPage from "./components/user/landing-page/landing-page";
import NotPurchasedCourseDetails from "./components/user/not-purchased-course/not-purchased-course-details/not-purchased-course-details";
import PaymentSuccess from "./components/user/payment-success/payment-success";
import SuccessfulPayment from "./components/user/successful-payment-page/successful-payment";
import PurchasedCourses from "./components/user/purchased-courses/purchased-courses";
import PurchasedCourseOverview from "./components/user/purchased-courses/purchased-course-overview/purchased-course-overview";
import PublishCourse from "./components/author/my-courses/course-details/publish-course/publish-course";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCart from "./components/shopping-cart/shopping-cart";
import PrivateRoute from "./infrastructure/gurad/private-route";
import NotFound from "./infrastructure/error/not-found";
import Profile from "./components/shared/profile/profile";
import AuthorRegistration from "./infrastructure/auth/registration/author-registration";
import UserManagment from "./components/admin/user-managment/user-managment";
import CategoryManagment from "./components/admin/category-managment/category-managment";

function App() {
  return (
    <Router>
      <div className="App-canvas">
        <Navbar />
        <Routes>
          {/* Shared */}
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />} />
          <Route path="/author-registration" element={<AuthorRegistration />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/course-info" element={<NotPurchasedCourseDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute roles={["User", "Author"]} element={<Profile />} />
            }
          />

          <Route
            path="/video-player"
            element={
              <PrivateRoute
                roles={["User", "Author"]}
                element={<VideoPlayer />}
              />
            }
          ></Route>

          {/* ----------------------------------------------------- */}

          {/* Admin */}
          <Route
            path="/user-managment"
            element={
              <PrivateRoute roles={["Admin"]} element={<UserManagment />} />
            }
          />

          <Route
            path="/category-managment"
            element={
              <PrivateRoute roles={["Admin"]} element={<CategoryManagment />} />
            }
          />

          {/* ----------------------------------------------------- */}

          {/* Author */}

          <Route
            path="/my-courses-dashboard"
            element={
              <PrivateRoute
                roles={["Author"]}
                element={<MyCoursesDashboard />}
              />
            }
          />
          <Route
            path="/course-details"
            element={
              <PrivateRoute roles={["Author"]} element={<CourseDetails />} />
            }
          />
          <Route
            path="/course-form"
            element={
              <PrivateRoute
                roles={["Author"]}
                element={
                  <PrivateRoute roles={["Author"]} element={<CourseForm />} />
                }
              />
            }
          />
          <Route
            path="/add-video"
            element={<PrivateRoute roles={["Author"]} element={<AddVideo />} />}
          />
          <Route
            path="/publish-course"
            element={
              <PrivateRoute roles={["Author"]} element={<PublishCourse />} />
            }
          />

          {/* User */}

          <Route
            path="/purchased-courses"
            element={
              <PrivateRoute roles={["User"]} element={<PurchasedCourses />} />
            }
          />
          <Route
            path="/purchased-courses-overview"
            element={
              <PrivateRoute
                roles={["User"]}
                element={<PurchasedCourseOverview />}
              />
            }
          />

          <Route
            path="/payment-success"
            element={
              <PrivateRoute roles={["User"]} element={<PaymentSuccess />} />
            }
          />
          <Route path="/successful-payment" element={<SuccessfulPayment />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Flip}
      />
    </Router>
  );
}

export default App;
