import React, {ReactNode} from 'react'

// Destructure children from props, children are of type ReactNode
const AuthLayout = ({children}: {children: ReactNode}) => {
    return (
        // Return any children pages trying to render
        <div>{children}</div>
    )
}
export default AuthLayout
