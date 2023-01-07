import './index.css';
import { translate } from "../../common/utils";

const Home = () => {

    return (
        <div className="container-fluid px-0">
            <div style={{ borderRadius: '1.5rem', backgroundColor: "#293331e3", color: "#2b2b2b" }}
                className="p-5 m-3 text-center shadow">
                <h1 className="font-bebas home-title text-light">
                    {translate("home.section1.title1")} <span className="color-primary">{translate("home.section1.title2")}</span>, {translate("home.section1.title3")}
                </h1>
            </div>

            <div className="container-fluid px-5 h-100">
                <h1 className="mt-5 ms-3 font-bebas mb-0">
                    <span className='color-primary'>{translate("home.section2.greetings")},</span>
                </h1>

                <p className="mb-5 ms-3">
                    {translate("home.section2.information")}
                </p>
            </div>
        </div>
    );
}
 
export default Home;