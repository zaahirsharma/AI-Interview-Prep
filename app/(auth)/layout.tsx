import React, {ReactNode} from 'react'
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

// Destructure children from props, children are of type ReactNode
const AuthLayout = async ({children}: {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) redirect('/');

    return (
        // Return any children pages trying to render
        <div className={'auth-layout'}>{children}</div>
    )
}
export default AuthLayout
