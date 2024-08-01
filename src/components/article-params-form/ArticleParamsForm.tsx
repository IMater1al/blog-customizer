import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Space } from '../space/Space';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

export const ArticleParamsForm = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	function toggleSidebar() {
		setIsSidebarOpen((prev) => !prev);
	}

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Space />
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={defaultArticleState.fontFamilyOption}
					/>
					<Space />
					<RadioGroup
						name='size-radio'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption}
					/>
					<Space />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={defaultArticleState.fontColor}
					/>
					<Space />
					<Separator />
					<Space />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={defaultArticleState.backgroundColor}
					/>
					<Space />
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={defaultArticleState.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
