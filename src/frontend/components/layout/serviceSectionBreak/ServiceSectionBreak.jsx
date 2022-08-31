import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

function ServiceSectionBreak( {
    uniqueClassName,
    leftHeading,
    leftDescription,
    leftCta,
    rightHeading,
    rightDescription,
    rightCta,
} ) {

    const intersectionOptions = useMemo( () => {
        return {
            threshold: 1,
            root: null,
            rootMargin: '0px 0px -100px 0px',
            triggerOnce: true
        }
    }, []);

    const { 
        ref: leftDivRef, 
        inView: isVisible
    } = useInView(intersectionOptions);

    const { 
        ref: rightDivRef, 
        inView: isVisible2
    } = useInView(intersectionOptions);

    


    return (
        <section
            className={`serviceSectionBreak-parent-container-${uniqueClassName}`}
            
        >
            <div
                ref={leftDivRef}
                className={
                    isVisible ? `serviceSectionBreak-leftwrapper-${uniqueClassName} fade-in` 
                    : `serviceSectionBreak-leftwrapper-${uniqueClassName}` }
            >
                <h2
                    className={`serviceSectionBreak-leftheading-${uniqueClassName}`}
                >
                    {isVisible ? leftHeading : ''}
                </h2>
                <p
                    className={`serviceSectionBreak-leftdescription-${uniqueClassName}`}
                >
                    {isVisible ? leftDescription : ''}
                </p>
                <p
                    className={`serviceSectionBreak-leftcta-${uniqueClassName}`}
                >
                    {isVisible ? leftCta : ''}
                </p>
            </div>

            <div
                ref={rightDivRef}
                className={isVisible2 ? `serviceSectionBreak-rightwrapper-${uniqueClassName} fade-in` : `serviceSectionBreak-rightwrapper-${uniqueClassName}`}
            >
                    <h2
                    className={`serviceSectionBreak-rightheading-${uniqueClassName}`}
                    >
                    {isVisible2 ? rightHeading : ''}
                </h2>
                <p
                    className={`serviceSectionBreak-rightdescription-${uniqueClassName}`}
                >
                    {isVisible2 ? rightDescription : ''}
                </p>
                <p
                    className={`serviceSectionBreak-rightcta-${uniqueClassName}`}
                >
                    {isVisible2 ? rightCta : ''}
                </p>
            </div>
        </section>
    )
}

export default ServiceSectionBreak;