import React from "react";
import "./App.css";
import Home from "./components/shared/home/home";
import Navbar from "./components/shared/navbar/navbar";
import VideoPlayer from "./components/video_player/video_player";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VideoUploader from "./components/video-uploader/video-uploader";
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
import { Bounce, Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App-canvas">
        <Navbar />
        <Routes>
          {/* Shared */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />} />
          {/* Author */}
          <Route
            path="/my-courses-dashboard"
            element={<MyCoursesDashboard />}
          />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/course-form" element={<CourseForm />} />
          <Route path="/add-video" element={<AddVideo />} />
          <Route path="/publish-course" element={<PublishCourse />} />
          {/* User */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/course-info" element={<NotPurchasedCourseDetails />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/successful-payment" element={<SuccessfulPayment />} />
          <Route path="/purchased-courses" element={<PurchasedCourses />} />
          <Route
            path="/purchased-courses-overview"
            element={<PurchasedCourseOverview />}
          />

          <Route path="/video-player" element={<VideoPlayer />}></Route>
          <Route path="/video-uploader" element={<VideoUploader />}></Route>
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
