import React from 'react';
/* TODO: Need to work on itnersection observers */
function ServiceSectionBreak( {
    uniqueClassName,
    leftHeading,
    leftDescription,
    leftCta,
    leftDivRef,
    rightHeading,
    rightDescription,
    rightCta,
    rightDivRef

} ) {
  return (
    <section
        className={`serviceSectionBreak-parent-container-${uniqueClassName}`}
        
    >
        <div
            ref={leftDivRef}
            className={`serviceSectionBreak-leftwrapper-${uniqueClassName}`}
        >
            <h2
                className={`serviceSectionBreak-leftheading-${uniqueClassName}`}
            >
                {leftHeading}
            </h2>
            <p
                className={`serviceSectionBreak-leftdescription-${uniqueClassName}`}
            >
                {leftDescription}
            </p>
            <p
                className={`serviceSectionBreak-leftcta-${uniqueClassName}`}
            >
                {leftCta}
            </p>
        </div>

        <div
            ref={rightDivRef}
            className={`serviceSectionBreak-rightwrapper-${uniqueClassName}`}
        >
             <h2
                className={`serviceSectionBreak-rightheading-${uniqueClassName}`}
             >
                {rightHeading}
            </h2>
            <p
                className={`serviceSectionBreak-rightdescription-${uniqueClassName}`}
            >
                {rightDescription}
            </p>
            <p
                className={`serviceSectionBreak-rightcta-${uniqueClassName}`}
            >
                {rightCta}
            </p>
        </div>
    </section>
  )
}

export default ServiceSectionBreak;