import clsx from 'clsx';
import styles from './Space.module.scss';

interface SpaceProps {
	height?: number;
}

export function Space({ height = 50 }: SpaceProps) {
	return <div style={{ height: height }} className={clsx(styles.space)}></div>;
}
