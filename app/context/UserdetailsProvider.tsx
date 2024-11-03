"use client"

import React, { createContext, useContext, useState } from "react";

const UserDetailsContext = createContext(null);

export const GetUserDetails = () => {
  return useContext(UserDetailsContext);
};

export const UserDetailsProvider = (props) => {
  const [userSignupEmail, setUserSignupEmail] = useState<string>('');

  return (
    <UserDetailsContext.Provider value={{ userSignupEmail, setUserSignupEmail }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};
