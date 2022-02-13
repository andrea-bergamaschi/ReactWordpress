import React, { createContext, useState } from 'react';

const Context = createContext(); //ContextName//

const ContextProvider = (props) => { //ContextNameProvider//
    const [myContext, setMyContext] = useState(
        {
            isLogged: false,
            loggedUser : {
                user : {
                    display_name: '',
                },
                roles: []
            },
            isSynced: true
        }
    );
    //context.loggedUser.user.display_name
    return (
        <Context.Provider value={[myContext, setMyContext]}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };