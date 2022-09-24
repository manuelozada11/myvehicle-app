import '../styles/App.css';

const Card = ({ title, subtitle, img, onClick }) => {
    return (
        <div className="py-3 px-4 my-3 mx-3 d-flex card-custom justify-content-between"
            onClick={ onClick ?? null }>
            <div>
                <h4 className="m-0">{ title }</h4>
                <p className="m-0 fw-bold">{ subtitle }</p>
            </div>

            <div className="border rounded-circle p-2 d-flex align-items-center"
                style={{ backgroundColor: "#c5c5c5" }}>{ img }</div>
        </div>
    );
}

export default Card;