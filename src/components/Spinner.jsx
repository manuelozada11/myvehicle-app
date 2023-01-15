const Spinner = ({ type= 1, size= "sm" }) => {
    return (
        <div className={`spinner-${type ? "border" : "grow"} spinner-${type ? "border" : "grow"}-${size}`}>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Spinner;