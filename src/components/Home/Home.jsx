import Article from "../Article/Article";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/slices/articles";

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <>
      {articles
        .filter((article, index) => {
          return index === 0;
        })
        .map((article, index) => {
          return (
            <Fragment key={article.id}>
              <Article article={article} key={article.id} index={index} />
            </Fragment>
          );
        })}

      <h1>Top 3</h1>
      {articles
        .filter((article, index) => {
          return index < 3;
        })
        .map((article, index) => {
          return (
            <Fragment key={article.id}>
              <Article article={article} key={article.id} index={index} />
            </Fragment>
          );
        })}
      <h1>Newest</h1>
      {articles
        .filter((article, index) => {
          return index < 4;
        })
        .map((article, index) => {
          return (
            <Fragment key={article.id}>
              <Article article={article} key={article.id} index={index} />
            </Fragment>
          );
        })}
    </>
  );
}
