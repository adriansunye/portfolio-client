import React, { useState } from "react"

type Props = {
    children?: React.ReactNode;
};

const UserContext = React.createContext([{}, () => {}])

let initialState = {}

const UserProvider =({ children }: Props) => {
  const [state, setState] = useState(initialState)

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
