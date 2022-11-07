import React from "react";
import { Header, Props } from "../header/Header";
import "./main.css";

export const Main: React.FC<Props> = (props) => {
    return (
        <React.Fragment>
            <Header {...props}/>
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
};