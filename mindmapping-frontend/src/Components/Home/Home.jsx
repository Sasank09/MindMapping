import {Features} from "./Features";
import {useEffect, useState} from "react";
import {About} from "./About";
import {Team} from "./Team";
import JsonData from "../../Data/data.json";
import './Home.css';
import Loader from "../Loader/Loader";

const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        setLandingPageData(JsonData);
    }, [])

    setTimeout(()=>{
        setLoading(false);
    },750);

    return (
        <>
        { loading? <Loader/>:
        <div>
            <Features data={landingPageData.Features}/>
            <About data={landingPageData.About}/>
            <Team data={landingPageData.Team}/>
        </div>
        }
        </>
    )
}

export default Home