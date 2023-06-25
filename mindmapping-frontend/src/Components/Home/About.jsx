import React from "react";

export const About = (props) => {
    return (
        <div id="about">
            <div className="homeContainer">
                <div className="section-title text-center">
                    <h2 style={{color:"antiquewhite"}}><u><i>About</i></u></h2>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="about-text">
                            <p>{props.data ? props.data.paragraph1 : "loading..."}</p>
                            <p>{props.data ? props.data.paragraph2 : "loading..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};