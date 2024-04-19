/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { header, subMenu } from "../Data";
import { Link } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { motion } from "framer-motion";

const Header = ({ token }) => {
  const [showSubmenu, setShowSubMenu] = useState(false);
  const [hoveredMenuItemIndex, setHoveredMenuItemIndex] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState()

  useEffect(() => {
    // console.log({ token });
    setLoggedInUser(localStorage.getItem('decodedToken'));
  }, [token]);


  return (
    <>
      <div className="flex flex-col justify-between px-3 py-5 lg:py-0 rounded shadow-2xl shadow-[#222] lg:flex-row lg:items-center">
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
              {header.map((items, index) => (
                <React.Fragment key={index}>
                  <Link
                    to={items.path}
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
                         {/* {items.menu === "Account" && ( 
                           <div className="mt-5 lg:hidden">
                           {subMenu.map((submenuItem, subIndex) => (
                            <React.Fragment key={subIndex}>
                              <Link to={submenuItem.path}>
                                <p
                                  className="p-1 px-2 my-1 rounded-sm bg-[#333] flex justify-center "
                                  onClick={() => setShowSubMenu(!showSubmenu)}
                                >
                                  {submenuItem.menu}
                                </p>
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      )} */}
                    </div>
                      {hoveredMenuItemIndex === index && index !== 5 && (
                      <motion.div
                        animate={{ x: 2 }}
                        transition={{ delay: 0.1 }}
                        className="relative bottom-0 flex flex-col gap-1"
                      >
                        <div className="w-full h-[.2rem] bg-[#AC8D75] absolute"></div>
                        <div className="w-1/2 h-[.2rem] bg-[#AC8D75] absolute top-[0.3rem]"></div>
                      </motion.div>
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
                  </Link>
                </React.Fragment>
              ))}
             </div>    
          </>
        </div>
      </div>
    </>
  );
};

export default Header;