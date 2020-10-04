import React, {createContext, useContext, useState} from "react";

const defaultContext = {
  user: undefined,
  setUser: () => {
  },
}
const UserContext = createContext(defaultContext);

const UserContextProvider = (props) => {
  const {children} = props

  const setUser = (user) => {
    console.log(user)
    setState({
      ...state,
      user: user
    })
  }

  const contextState = {
    ...defaultContext,
    setUser
  }
  const [state, setState] = useState(contextState)

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )

}
const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider }