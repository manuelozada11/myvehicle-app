import QrCode from "qrcode.react";
import { translate } from "../common/utils";
import "../styles/App.css";

const CustomQrCode = ({ value, height= 150, width= 150, onClose, onAccept, confirmation, title= "-", subtitle= "-", qrSubtitle= "-" }) => {
    return (
        <>
            <div className="qr-background" onClick={ onClose }></div> 
            <div className="qr-modal p-5 d-flex flex-column align-items-center">
            { 
                !confirmation ?
                    <div>
                        <div className="qr-code">
                            <QrCode
                                value={ value } 
                                renderAs={'svg'}
                                height={height}
                                width={width} />
                        </div>
                        <p className="mx-0 mb-0 mt-3 text-center">{ qrSubtitle }</p>
                    </div>
                :
                <div className="d-flex flex-column text-center">
                    <h5>{ title }</h5>
                    <div className="my-2">
                        <button className="btn btn-outline-primary rounded-pill m-2" onClick={ onAccept }>{ translate("vehicle.information.qrcode.accept") }</button>
                        <button className="btn btn-primary rounded-pill m-2" onClick={ onClose }>{ translate("vehicle.details.cancel") }</button>
                    </div>
                    <p className="m-0 fw-bold text-danger">{ subtitle }</p>
                </div>
            }
            </div>
        </>
    );
}

export default CustomQrCode;