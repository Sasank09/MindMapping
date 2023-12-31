import React from "react";

export const Features = (props) => {
    return (
        <div id="features" className="text-center">
            <div className="homeContainer">
                <div className="section-title">
                    <h2 style={{color:"antiquewhite"}}><u><i>Features</i></u></h2>
                </div>
                <div className="row">
                    {props.data
                        ? props.data.map((d, i) => (
                            <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                                {" "}
                                <i className={d.icon}></i>
                                <h3>{d.title}</h3>
                                <p>{d.text}</p>
                            </div>
                        ))
                        : "Loading..."}
                </div>
                <br/>
            </div>

        </div>
    );
};