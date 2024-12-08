import {
  faCcApplePay,
  faCcMastercard,
  faCcPaypal,
  faSquareFacebook,
  faSquareGithub,
  faSquareInstagram,
  faSquareXTwitter,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Features", "Works", "Career"],
    },
    {
      title: "Help",
      links: [
        "Customer support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQs",
      links: ["Accounts", "Manage Deliveries", "Orders", "Payments"],
    },
    {
      title: "Resources",
      links: [
        "Free eBooks",
        "Development Tutorials",
        "How to-Blog",
        "YouTube Playlist",
      ],
    },
  ];

  const socialIcons = [
    faSquareXTwitter,
    faSquareFacebook,
    faSquareInstagram,
    faSquareGithub,
  ];

  const paymentIcons = [faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay];

  return (
    <div className="bg-[#F2F0F1] mt-[200px] sm:mt-[120px] relative">
      <div className="absolute -top-[140px] sm:-top-[95px] sm:left-[80px] left-[20px] w-[90%] bg-black text-white rounded-3xl sm:flex items-center justify-between p-10">
        <h2 className="text-xl sm:text-4xl font-bold">
          STAY UP-TO-DATE ABOUT OUR LATEST PRODUCTS
        </h2>
        <div className="flex flex-col gap-2 mt-2 sm:mt-0">
          <div className="relative">
            <input
              className="bg-gray-100 rounded-full h-12 w-full mx-auto pl-12 sm:pr-5"
              placeholder="Enter Your Email Address"
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute top-4 left-4 text-xl text-gray-500"
            />
          </div>
          <button className="bg-white text-black h-12 w-full rounded-full font-bold hover:scale-105">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <div className="sm:grid grid-cols-6 sm:px-[100px] pt-[100px] pb-[25px] w-[90%] mx-auto">
        <div className="col-span-2 flex flex-col gap-2 sm:gap-4 pe-[40px]">
          <p className="font-bold text-4xl mt-7 sm:mt-0">Shop.co</p>
          <p className="text-gray-600">
            We have clothes that suit your style and make you proud to wear.
            From Women to Men.
          </p>
          <div className="text-3xl flex items-center gap-4 cursor-pointer">
            {socialIcons.map((icon, index) => (
              <FontAwesomeIcon
                key={index}
                icon={icon}
                className="transition duration-200 hover:-translate-y-1"
              />
            ))}
          </div>
        </div>

        {footerLinks.map((section, index) => (
          <div
            key={index}
            className={`flex gap-3 flex-col ${
              index < 2 ? "sm:hidden" : "hidden sm:flex"
            }`}
          >
            <h4 className="text-xl font-bold">{section.title}</h4>
            <div>
              {section.links.map((link, i) => (
                <p key={i}>{link}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center sm:flex items-center justify-between sm:mx-[100px] border-t border-black pt-[25px] pb-[50px]">
        <div>
          <p>Shop.co ©2000-2024. All Rights Reserved</p>
        </div>
        <div className="flex items-center gap-2 text-4xl pe-10 justify-center">
          {paymentIcons.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
