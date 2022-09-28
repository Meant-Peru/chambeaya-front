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
	eventS?: (select: any) => void;
	
}

export const OptionComponent = ({ select = false, eventS = () => { }, tag }: Props) => {
	return <>{
		select ? 
	<Chip className='mr-1' label={tag.nameSkill} color="primary" onClick={() => eventS(tag)} />
	 : 
	<Chip className='mr-1' label={tag.nameSkill} onClick={() => eventS(tag)} />}</>;
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
