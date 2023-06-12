import { useNavigate } from "react-router-dom";
import { getStorageValue } from "../common/utils";
import BackButton from "../components/BackButton";

const CarTitle = ({ backTo, title, subtitle }) => {
    const car = getStorageValue('vehicle');
    let navigate = useNavigate();
    
    const onGoBack = () => {
        navigate(backTo);
    }

    return (
        <>
            <div className="col-9 ps-0">
                <h1 className="m-0 fw-bold d-flex align-items-center">
                    { title ? title : (car?.fullname ?? 'Name') }
                </h1>
                <p className="m-0">
                    { subtitle ? subtitle : (car?.plateNumber ?? 'Last Name') }
                </p>
            </div>

            <div className="pe-0 col-3 d-flex justify-content-end align-items-center">
                <BackButton onClick={ onGoBack } />
            </div>
        </>
    );
}

export default CarTitle;