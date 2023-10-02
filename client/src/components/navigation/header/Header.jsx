<<<<<<< HEAD
import React, { useState } from "react";
=======
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
>>>>>>> 5eed306e41444a5128b9d12fd6a40e5ca2856a2b
import { header, subMenu } from "../Data";
import { Link } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";

<<<<<<< HEAD
const Header = () => {
=======

const Header = ({token}) => {
>>>>>>> 5eed306e41444a5128b9d12fd6a40e5ca2856a2b
  const [showSubmenu, setShowSubMenu] = useState(false);
  const [hoveredMenuItemIndex, setHoveredMenuItemIndex] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

<<<<<<< HEAD
  return (
    <>
      <div className="flex flex-col justify-between px-3 rounded shadow-2xl shadow-[#222] lg:flex-row lg:items-center">
=======
  useEffect (()=>{
  console.log({token})
  },[token])

  return (
    <> 
      <div className="flex flex-col justify-between px-3 py-5 lg:py-0 rounded shadow-2xl shadow-[#222] lg:flex-row lg:items-center">
>>>>>>> 5eed306e41444a5128b9d12fd6a40e5ca2856a2b
        <div className="flex items-center justify-between ">
          <img src="https://picsum.photos/50/30" className="rounded" alt="" />
          <div className="flex lg:hidden text-[2rem]">
            <CgMenuRight onClick={() => setMobileMenu(!mobileMenu)} />
          </div>
        </div>
        <div className="my-4 rounded lg:bg-inherit lg:w-2/3">
          <>
            <div
              className={`flex flex-col items-end w-full lg:flex lg:justify-evenly lg:flex-row ${
                mobileMenu ? "block" : "hidden"
              } gap-3 p-5`}
            >
<<<<<<< HEAD
              {header.map((items, index) => (
                <React.Fragment key={index}>
                  <div
                    // to={items.path}
                    className={` ${hoveredMenuItemIndex === index ? "" : ""}`}
                    onMouseEnter={() => {
                      if (items.menu === "Account") {
                        setShowSubMenu(true);
                      }
                      setHoveredMenuItemIndex(index);
                    }}
                    onMouseLeave={() => {
                      if (items.menu === "Account") {
                        setShowSubMenu(false);
                      }
                      setHoveredMenuItemIndex(null);
                    }}
                    onClick={() => setMobileMenu(!mobileMenu)}
                  >
                    <div className="flex flex-col items-center">
                      {items.menu}
                      {items.menu === "Account" && (
                        <div className="mt-5 lg:hidden">
                          {subMenu.map((submenuItem, subIndex) => (
                            <React.Fragment key={subIndex}>
                              <Link to={submenuItem.path}>
                                <p
                                  className="p-1 px-2 my-1 border rounded-sm"
                                  onClick={() => setShowSubMenu(!showSubmenu)}
                                >
                                  {submenuItem.menu}
                                </p>
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                    {hoveredMenuItemIndex === index && index !== 5 && (
                      <div className="relative bottom-0 flex flex-col gap-1">
                        <div className="w-full h-[.2rem] bg-[#AC8D75] absolute"></div>
                        <div className="w-1/2 h-[.2rem] bg-[#AC8D75] absolute top-[0.3rem]"></div>
                      </div>
                    )}

                    {hoveredMenuItemIndex === 5 && showSubmenu && (
                      <div
                        className={` flex-col  ${
                          index === 5 ? "absolute" : "hidden"
                        }`}
                      >
                        {subMenu.map((submenuItem, subIndex) => (
                          <React.Fragment key={subIndex}>
                            <Link to={submenuItem.path}>
                              <p
                                className="p-1 my-1 border rounded-sm"
                                onClick={() => setShowSubMenu(!showSubmenu)}
                              >
                                {submenuItem.menu}
                              </p>
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
=======
             {header.map((items, index) => (
  <React.Fragment key={index}>
    <div
      className={` ${hoveredMenuItemIndex === index ? "" : ""}`}
      onMouseEnter={() => {
        if (items.menu === "Account") {
          setShowSubMenu(true);
        }
        setHoveredMenuItemIndex(index);
      }}
      onMouseLeave={() => {
        if (items.menu === "Account") {
          setShowSubMenu(false);
        }
        setHoveredMenuItemIndex(null);
      }}
      onClick={() => setMobileMenu(!mobileMenu)}
    >
      <Link to={items.path}>
        <div className="flex flex-col items-center">
          {items.menu}
          {items.menu === "Account" && (
            <div className="mt-5 lg:hidden">
              {subMenu.map((submenuItem, subIndex) => (
                <React.Fragment key={subIndex}>
                  <Link to={submenuItem.path}>
                    <p
                      className="p-1 px-2 my-1 rounded-sm bg-[#333] flex justify-center"
                      onClick={() => setShowSubMenu(!showSubmenu)}
                    >
                      {submenuItem.menu}
                    </p>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
    {hoveredMenuItemIndex === index && index !== 5 && (
      <div className="relative bottom-0 flex flex-col gap-1">
        <div className="w-full h-[.2rem] bg-[#AC8D75] absolute"></div>
        <div className="w-1/2 h-[.2rem] bg-[#AC8D75] absolute top-[0.3rem]"></div>
      </div>
    )}

    {hoveredMenuItemIndex === 5 && showSubmenu && (
      <div
        className={` flex-col  ${index === 5 ? "absolute" : "hidden"}`}
      >
        {subMenu.map((submenuItem, subIndex) => (
          <React.Fragment key={subIndex}>
            <Link to={submenuItem.path}>
              <p
                className="p-1 my-2 rounded-sm bg-[#444] flex justify-center px-2 hover:scale-[1.05]"
                onClick={() => setShowSubMenu(!showSubmenu)}
              >
                {submenuItem.menu}
              </p>
            </Link>
          </React.Fragment>
        ))}
      </div>
    )}
  </React.Fragment>
))}

            </div>
>>>>>>> 5eed306e41444a5128b9d12fd6a40e5ca2856a2b
          </>
        </div>
      </div>
    </>
  );
};

export default Header;
