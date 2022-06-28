import React from 'react';
import { Skill } from '../../../interfaces/Skill';

import './../../../sass/shared/_tag.scss';

interface Props {
	type: string;
	level: string;
	label: string;
	tag?: Skill;
	clear?: boolean;
	clearTag?: string;
	event?: (select: Skill) => void;
}

export const TagComponent = ({ type, level, label, clearTag, event = () => {}, tag }: Props) => {
	return (
		<React.Fragment>
			<button className={'tagComponent-' + type + '-' + level}>{label}</button>
			<div className={clearTag} onClick={() => event(tag)}>
			
			</div>
		</React.Fragment>
	);
};

// export default function TagComponent({ type, level, label, event = () => {} }: Props) {
// 	return (
// 		<React.Fragment>
// 			<button className={'tagComponent-' + type + '-' + level}>{label}</button>
// 			<div className="clearTag" onClick={() => event}>
// 				x
// 			</div>
// 		</React.Fragment>
// 	);
// }
