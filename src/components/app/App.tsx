import clsx from 'clsx';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { IFormSettings } from '../article-params-form/ArticleParamsForm';
import { initialFormState } from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';

import styles from '../../styles/index.module.scss';

export const App = () => {
	//Стейт с настройками страницы
	const [pageSettings, setPageSettings] =
		useState<IFormSettings>(initialFormState);

	//Коллбек через который применяются настройки на страницу
	function handleApply(settings: IFormSettings) {
		setPageSettings(settings);
	}

	return (
		<>
			<header></header>
			<main
				className={clsx(styles.main)}
				style={
					{
						'--font-family': pageSettings.fontFamily.value,
						'--font-size': pageSettings.fontSize.value,
						'--font-color': pageSettings.fontColor.value,
						'--container-width': pageSettings.contentWidth.value,
						'--bg-color': pageSettings.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm onApply={handleApply} />
				<Article />
			</main>
		</>
	);
};
