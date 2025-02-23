export function Team(){
    return (
        <>
         <section id="team" className="team section light-background">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Team</h2>
            <p>CHECK OUR TEAM</p>
          </div>
    
          <div className="container">
            <div className="row gy-5">
              {/* Team Members */}
              {[
                {
                  name: "Walter White",
                  role: "Chief Executive Officer",
                  img: "./src/img/team/team-1.jpg",
                  delay: "100",
                },
                {
                  name: "Sarah Jhonson",
                  role: "Product Manager",
                  img: "src/img/team/team-2.jpg",
                  delay: "200",
                },
                {
                  name: "William Anderson",
                  role: "CTO",
                  img: ".././src/img/team/team-3.jpg",
                  delay: "300",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={member.delay}
                >
                  <div className="member">
                    <div className="pic">
                      <img src={member.img} className="img-fluid" alt={member.name} />
                    </div>
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <span>{member.role}</span>
                      <div className="social">
                        <a href="#">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </>
       
      );
}