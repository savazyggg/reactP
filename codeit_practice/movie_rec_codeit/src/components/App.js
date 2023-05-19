import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [loadingError, setLodingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoding(true);
      setLodingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLodingError(error);
      console.log(error);
      return;
    } finally {
      setIsLoding(false);
    }
    const { paging, reviews } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]); //이렇게 콜백을 넣어주면 삭제된 데이터까지가 전데이터, 이후 새로운 더보기 렌더링
    } //setItems([…items, …reviews]);
    //비동기 함수로 먼저 등록되고 실행은 나중에 됨 이때 실행되기전 삭제를 누르면 handleDelete가 먼저 실행되고 실제로 유저는 삭제했지만 비동기함수인 handleLoad에서는 삭제되지 않고, 더보기가 됨
    setOffset(options.offset + options.limit);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
