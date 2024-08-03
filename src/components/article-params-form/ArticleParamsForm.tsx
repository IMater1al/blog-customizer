import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { useEffect, useRef, useState } from 'react';
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

export interface ArticleParamsFormProps {
	onApply(settings: IFormSettings): void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<IFormSettings>(initialFormState);

	const articleRef = useRef<HTMLDivElement>(null);

	function handleOptionChange(option: OptionType, name: keyof IFormSettings) {
		setOptions({ ...options, [name]: option });
	}

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isSidebarOpen]);

	useEffect(() => {
		function handleClose(event: Event) {
			if (event instanceof KeyboardEvent) {
				if (event.key === 'Escape') {
					setIsSidebarOpen(false);
				}
			}

			if (event instanceof MouseEvent) {
				if (
					event.target instanceof Node &&
					!articleRef.current?.contains(event.target) &&
					!(event.target instanceof HTMLLIElement)
				) {
					setIsSidebarOpen(false);
				}
			}
		}

		if (isSidebarOpen) {
			document.addEventListener('keydown', handleClose);
			document.addEventListener('click', handleClose);
		}

		return () => {
			document.removeEventListener('keydown', handleClose);
			document.removeEventListener('click', handleClose);
		};
	}, [isSidebarOpen]);

	function toggleSidebar() {
		setIsSidebarOpen((prev) => !prev);
	}

	function handleSubmit(event: React.MouseEvent) {
		event.preventDefault();
		onApply(options);
	}

	function handleReset() {
		setOptions(initialFormState);
	}

	return (
		<div ref={articleRef}>
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
						selected={options.fontFamily}
					/>
					<Space />
					<RadioGroup
						onChange={handleOptionChange}
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={options.fontSize}
					/>
					<Space />
					<Select
						onChange={handleOptionChange}
						name='fontColor'
						title='Цвет шрифта'
						options={fontColors}
						selected={options.fontColor}
					/>
					<Space />
					<Separator />
					<Space />
					<Select
						onChange={handleOptionChange}
						name='backgroundColor'
						title='Цвет фона'
						options={backgroundColors}
						selected={options.backgroundColor}
					/>
					<Space />
					<Select
						onChange={handleOptionChange}
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={options.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button onClick={handleSubmit} title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
