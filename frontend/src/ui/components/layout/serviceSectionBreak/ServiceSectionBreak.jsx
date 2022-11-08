import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

function ServiceSectionBreak({
	uniqueClassName,
	leftHeading,
	leftDescription,
	leftCta,
	rightHeading,
	rightDescription,
	rightCta,
}) {
	const intersectionOptions = useMemo(() => {
		return {
			threshold: 0.8,
			root: null,
			rootMargin: '0px 0px 100px 0px',
			triggerOnce: true,
		};
	}, []);

	const { ref: leftDivRef, inView: isVisible } =
		useInView(intersectionOptions);

	const { ref: rightDivRef, inView: isVisible2 } =
		useInView(intersectionOptions);

	return (
		<section
			className={`serviceSectionBreak-parent-container-${uniqueClassName}`}
		>
			<div
				ref={leftDivRef}
				className={
					isVisible
						? `serviceSectionBreak-leftwrapper-${uniqueClassName} fade-in`
						: `serviceSectionBreak-leftwrapper-${uniqueClassName}`
				}
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
				<p className={`serviceSectionBreak-leftcta-${uniqueClassName}`}>
					{leftCta}
				</p>
			</div>

			<div
				ref={rightDivRef}
				className={
					isVisible2
						? `serviceSectionBreak-rightwrapper-${uniqueClassName} fade-in`
						: `serviceSectionBreak-rightwrapper-${uniqueClassName}`
				}
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
	);
}

export default ServiceSectionBreak;
