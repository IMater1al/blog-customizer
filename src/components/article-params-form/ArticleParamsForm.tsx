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
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	initialFormState,
	OptionType,
} from 'src/constants/articleProps';
import { Space } from '../space/Space';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

export interface IFormSettings {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

export const ArticleParamsForm = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [formSettings, setFormSettings] =
		useState<IFormSettings>(initialFormState);

	function handleOptionChange(option: OptionType, name?: keyof IFormSettings) {
		if (name) {
			setFormSettings({ ...formSettings, [name]: option });
		}
	}

	function toggleSidebar() {
		setIsSidebarOpen((prev) => !prev);
	}

	function handleSubmit(event: React.MouseEvent) {
		event.preventDefault();
	}

	function handleReset() {
		setFormSettings(initialFormState);
	}

	// useOutsideClickClose(isSidebarOpen);

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
						name='fontFamily'
						onChange={handleOptionChange}
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formSettings.fontFamily}
					/>
					<Space />
					<RadioGroup
						onChange={handleOptionChange}
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formSettings.fontSize}
					/>
					<Space />
					<Select
						onChange={handleOptionChange}
						name='fontColor'
						title='Цвет шрифта'
						options={fontColors}
						selected={formSettings.fontColor}
					/>
					<Space />
					<Separator />
					<Space />
					<Select
						onChange={handleOptionChange}
						name='backgroundColor'
						title='Цвет фона'
						options={backgroundColors}
						selected={formSettings.backgroundColor}
					/>
					<Space />
					<Select
						onChange={handleOptionChange}
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={formSettings.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button onClick={handleSubmit} title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
