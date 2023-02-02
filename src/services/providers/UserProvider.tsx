import React, { useState } from "react"

type Props = {
    children?: React.ReactNode;
};


type IUserState = {
  details?: object,
  token?: string,
};
type IUserContext = [IUserState, React.Dispatch<React.SetStateAction<IUserState>>];


export const UserContext = React.createContext<IUserContext>([{}, () => {}]);

const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState<IUserState>({});

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;