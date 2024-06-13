import Article from "../Article/Article";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/slices/articles";

export default function Articles() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);
  return (
    <>
      <h1>All articles</h1>
      {articles.map((article) => {
        return (
          <Fragment key={article.id}>
            <aside>{article.categorie}</aside>
          </Fragment>
        );
      })}
      {articles.map((article, index) => {
        return (
          <Fragment key={article.id}>
            <Article article={article} key={article.id} index={index} />
          </Fragment>
        );
      })}
    </>
  );
}
