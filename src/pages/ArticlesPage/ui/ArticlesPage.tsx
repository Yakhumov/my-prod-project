import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleList } from "entities/Article/ui/ArticleList/ArticleList";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModelLoader/DynamicModelLoader";
import { useInitialEffect } from "shared/lib/hooks/useAppDispatch/useInitialEffect/useInitialEffect";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticles } from "../model/services/fetchArticles";
import { getArticles } from "../model/slices/ArticlePageSlice";
import { articlesPageReducer } from "../model/slices/ArticlePageSlice";
import cls from "./ArticlesPage.module.scss";
import {
  getArticlePage,
  getArticlePageError,
  getArticlePageHasmore,
  getArticlePageIsLoading,
  getArticlePageView,
} from "../model/selectors/articlesPageSelectors";
import { ArticleViewSelector } from "entities/Article";
import { ArticleView } from "entities/Article/model/types/article";
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlesPage } from "../model/services/fetchNextArticles";
import { articlesPageActions } from "../model/slices/ArticlePageSlice";
import { initArticlesPage } from "../model/services/initedArticles";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const error = useSelector(getArticlePageError);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
}, [dispatch]);

const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
}, [dispatch]);

useInitialEffect(() => {
   dispatch(initArticlesPage()) 
});

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
