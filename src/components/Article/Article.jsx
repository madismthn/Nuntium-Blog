export default function Article({ article }) {
  return (
    <>
      <img src={article.img} alt="" />
      <div>{article.categorie}</div>
      <h2>{article.title}</h2>
      <div>
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>
      <div>{article.description}</div>
    </>
  );
}
