/*
 *  Component Name:  Title
 *     Description:  This component renders the title and an information card
 *                   about the application using a bootstrap Accordion 
 *                   component so it can collapse and expand as needed.
 */
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function Title() {
  return (
    <div id="title" className="title container-fluid">
      <div className="d-flex justify-content-center align-items-center">
        <div className="title-with-info">
          <Accordion>
            <Card>
              <Accordion.Toggle
                className="d-flex justify-content-center"
                as={Card.Header}
                eventKey="title-info"
              >
                <div className="d-flex align-items-center">
                  <h1 className="mb-1 mt-4">Correlation Nation</h1>
                  <div className="info-icon ml-3">
                    <i className="fas fa-question-circle" />
                  </div>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="title-info">
                <Card.Body className="title-info mb-3">
                  This app displays a pair of national statistics for many
                  countries on a scatter-plot graph. It is useful for showing
                  correlation between country-level statistics. But remember:
                  correlation does not mean causation!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Title;
