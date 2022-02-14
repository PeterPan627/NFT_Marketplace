import React, { ReactNode, useState, useRef } from "react";

import { AccordionWrapper, AccordionHeader, AccordionBody } from "./styled";

interface Props {
  header: string;
  body: ReactNode;
}

const Accordion: React.FC<Props> = ({ header, body }) => {
  const [expanded, setExpanded] = useState(true);
  const accordionBody = useRef(null);

  const handleClickAccordionHeader = () => {
    setExpanded(!expanded);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={handleClickAccordionHeader} expanded={expanded}>
        {header}
        <i className="fa-solid fa-angle-up" />
      </AccordionHeader>
      <AccordionBody ref={accordionBody} expanded={expanded}>
        {body}
      </AccordionBody>
    </AccordionWrapper>
  );
};

export default Accordion;
