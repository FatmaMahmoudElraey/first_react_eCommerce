import { Carousel } from "react-bootstrap";

export const Hero = () => {
  const slides = [
    { src: "../src/img/slider-bg-3-2.webp" },
    { src: "../src/img/slider-bg-3.webp" },
    // { src: "../src/img/slide-01.jpg"},
    // { src: "../src/img/slide-02.jpg"},
    // { src: "../src/img/slide-03.jpg"},
    // { src: "../src/img/slide-04.jpg"},
    // { src: "../src/img/slide-05.jpg"},
    // { src: "../src/img/slide-06.jpg"},
    // { src: "../src/img/slide-07.jpg"},
  ];

  return (
    <Carousel id="hero" className="hero section dark-background">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={slide.src} alt={`Slide ${index + 1}`} />
          <div className="overlay"></div>

          {/* Responsive Caption */}
          <div className="carousel-caption d-flex flex-column align-items-start text-start p-3 p-md-4"
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              transform: "translateY(-50%)",
              borderRadius: "8px",
              maxWidth: "90%", // Adjust for smaller screens
              width: "400px", // Fixed width for larger screens
            }}
          >
            <h4 className="text-light mb-2">Up To 40% Off</h4>
            <h2 className="text-light mb-3">NEW SEASON, SHOP NOW!</h2>
            <p className="text-light mb-4">We are a team of talented designers making furniture  with LOVE</p>
            <div className="d-flex flex-column flex-md-row gap-3">
              <a onClick={() => window.scrollTo({ top: 1080, behavior: "smooth" })} className="btn-get-started text-light btn btn-danger">Get Started</a>
              <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center btn btn-outline-light">
                <i className="bi bi-play-circle me-2"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

