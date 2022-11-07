import React from 'react';

function ContentSectionBreak({ Heading, sectionClassName, headingClassName }) {
	return (
		<section
			className={`contentSectionBreak-parent-container-${sectionClassName}`}
		>
			<h2 className={`contentSectionBreak-heading-${headingClassName}`}>
				{Heading}
			</h2>
		</section>
	);
}

export default ContentSectionBreak;
