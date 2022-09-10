import './index.css';

const Carousel = ({ infoCarouselImgs }) => {
    return(
        <div id="carouselHome" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {
                    infoCarouselImgs?.map((c, index) => {
                        if (index === 0) return <li data-target="#carouselHome" data-slide-to={index} key={index} className="active" />
                        else return <li data-target="#carouselHome" data-slide-to={index} key={index} />
                    })
                }
            </ol>
            <div className="carousel-inner">
                {
                    infoCarouselImgs?.map((carousel, index) => {
                        return <div className={"carousel-item " + (index === 0 ? "active" : "")} key={index}>
                            <img id={ "myCarousel-" + (index + 1) } className={ `d-block imgCarousel ${ carousel.mid ? 'mid' : '' }` } src={ carousel.url } alt={"slide" + (index + 1)} />
                            <div className="carousel-caption text-center">
                                <h3>{ carousel.title }</h3>
                                <span className="carousel-text-subtitle">{ carousel.subtitle }</span>
                            </div>
                        </div>
                    })
                }
            </div>
            { infoCarouselImgs?.length > 1 &&
            <>
                <a className="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </>
            }
        </div>
    );
}

export default Carousel;