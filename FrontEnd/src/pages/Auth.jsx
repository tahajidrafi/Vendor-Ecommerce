import React from "react";
import UserAuthenticationForm from "../Components/UserAuthentication";
import Header from "../components/Header";
import Footer from "../Components/Footer";

const Auth = () => {
  return (
    <div>
      <Header />
      <UserAuthenticationForm />
      <Footer />
    </div>
  );
};

export default Auth;
