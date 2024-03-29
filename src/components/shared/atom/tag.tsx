import { Chip } from '@mui/material';
import React from 'react';
import { Skill, SkillSelect } from '../../../interfaces/Skill';

import './../../../sass/shared/_tag.scss';

interface Props {
	type?: string; //selectable vs erasable
	tag: any;
	level?: string;
	label?: string;
	select?: boolean;
	eventD?: (select: any) => void;


}

export const TagComponent = ({ select = false, eventD = () => { }, tag }: Props) => {
	return <>{
		select ? 
	<Chip label={tag.nameSkill}  onDelete={() => eventD(tag)}/>
	 : 
	<Chip label={tag.nameSkill} onDelete={() => eventD(tag)}/>}</>;
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
