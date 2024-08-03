import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	IFormSettings,
} from './components/article-params-form/ArticleParamsForm';
import { initialFormState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//Стейт с настройками страницы
	const [pageSettings, setPageSettings] =
		useState<IFormSettings>(initialFormState);

	//Коллбек через который применяются настройки на страницу
	function handleApply(settings: IFormSettings) {
		setPageSettings(settings);
	}

	return (
		<div
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
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
