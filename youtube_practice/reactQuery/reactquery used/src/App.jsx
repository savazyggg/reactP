import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const POSTS = [
  { id: 1, title: "post1" },
  { id: 2, title: "post2" },
];

// /posts => ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1 => ["posts", {authorId : 1}]
// /posts/2/comments => ["posts", post.id, "comments"]
function App() {
  console.log(POSTS);
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"], //고유 식별자
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log(obj);
        return [...POSTS];
      }), //데이터를 가져오는 등
  });

  const newPostMutaiton = useMutation({
    mutationFn: () => {
      wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: "new post" })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <div>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutaiton.isLoading}
        onClick={() => newPostMutaiton.mutate("new post")}
      >
        add new
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
