import React, {Component} from "react"
import { Route, Redirect, RouteProps} from "react-router"
import StateType from "./StateType"
import Dashboard from './Dashboard'

type Props={
    sessionToken: any,
    role?: any
    state?: any
}

const ProtectedRoutes = (props:Props) => {
    if(props.sessionToken){
        return <Route path="/home"><Dashboard state={props.state}/></Route>
    } else {
    return(
        <Redirect to="/auth" />
    )}
}

export default ProtectedRoutes;