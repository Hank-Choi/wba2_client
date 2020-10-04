import React, {createContext, useContext, useState} from "react";

const defaultContext = {
  currentUser: undefined,
  setCurrentUser: () => {
  },
}
const UserContext = createContext(defaultContext);

const UserContextProvider = (props) => {
  const {children} = props

  const setCurrentUser = (user) => {
    console.log(user)
    setState({
      ...state,
      currentUser: user
    })
  }

  const contextState = {
    ...defaultContext,
    setCurrentUser
  }
  const [state, setState] = useState(contextState)

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )

}
const useUserContext = () => useContext(UserContext);

export {useUserContext, UserContextProvider}