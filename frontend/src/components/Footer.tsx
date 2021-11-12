import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./Footer.css";

function Footer(){

    return (
        <footer className="footer">          
          <section className="footer-contents">
            <Container className="footer-container">
            <Row>
            <Col>
                <InputGroup.Text>X-axis</InputGroup.Text>
                    <DropdownButton variant="light" title="Nutrient">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col>
            <InputGroup.Text>Y-axis</InputGroup.Text>
                    <DropdownButton variant="light" title="Nutrient">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col>
            <div className="d-grid">
                <Button variant="primary" size="sm">
                    Align
                </Button>
            </div>
            </Col>            
            </Row>
            </Container>
          </section>
        </footer>
      )

    // return (
    //     <section className="footer">
    //       <hr className="footer-seperator" />
    //       <section className="footer-social-media">
    //         <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    //       </section>
    //       <section className="footer-info">
    //         <section className="footer-info-left">
    //           <section className="footer-info__name">
    //               Software Engineer Haydn
    //           </section>
    //           <section className="footer-info__returns">
    //             Returns Policy
    //             <br />
    //             Delivery
    //           </section>        
    //         </section>
    //         <section className="footer-info-center">
    //           <section className="footer-info__email">
    //             shop.info@gmail.com
    //           </section>
    //           <section className="footer-info__terms">
    //             Terms and Conditions
    //             <br />
    //             Copyright
    //           </section>
    //         </section>
    //         <section className="footer-info-right">
    //           <section className="footer-info__number">
    //             99999999999
    //           </section>
    //           <section className="footer-info__contact">
    //             My Story
    //             <br />
    //             Contact Us
    //           </section>
    //         </section>
    //       </section>
    //       <hr className="footer-seperator" />
    //     </section>
    //   )
}

export default Footer;
