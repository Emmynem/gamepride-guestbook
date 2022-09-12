import React from "react";

const Footer = () => {
    return (
        <footer className="footer sticky-bottom" style={{ marginBottom: '-50px', border: '0px'}}>
            <div className="jumbotron jumbotron-fluid bg-dark text-light">
                <div className="container">
                    <h2>Guest Book App</h2>
                    <h5 className='font-weight-light pt-2'>GamePride guest book application made with ❤ by <a href="https://www.linkedin.com/in/emmanuel-nwoye">Emmanuel Nwoye</a> </h5>
                    <div className="d-flex justify-content-around">
                        <div className="p-2"><a href="https://github.com/Emmynem"><i className="fab fa-github display-4 text-light"></i></a>  </div>
                        <div className="p-2"><a href="https://instagram.com/deltorox"> <i className="fab fa-instagram display-4 text-light"></i></a></div>
                        <div className="p-2"><a href="https://twitter.com/deltorox"><i className="fab fa-twitter display-4 text-light"></i></a></div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;