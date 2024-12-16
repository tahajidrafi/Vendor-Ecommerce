import React from "react";
import UserAuthenticationForm from "../Components/UserAuthentication";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

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
