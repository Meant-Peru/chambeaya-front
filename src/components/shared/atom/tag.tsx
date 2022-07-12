import { Chip } from '@mui/material';
import React from 'react';
import { Skill, SkillSelect } from '../../../interfaces/Skill';

import './../../../sass/shared/_tag.scss';

interface Props {
	type?: string;
	tag: any;
	level?: string;
	label?: string;
	select?: boolean;
	event?: (select: any) => void;
}

export const TagComponent = ({ select = false, event = () => {}, tag }: Props) => {
	return <>{select ? <Chip label={tag.nameSkill} variant={'outlined'} onClick={() => event(tag)} /> : <Chip label={tag.nameSkill} onClick={() => event(tag)} />}</>;
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
