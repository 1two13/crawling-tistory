import React from 'react';
import useFetchPosts from '../hooks/useFetchPosts';

type PostType = {
    id: number;
    title: string;
    content: string;
    link: string;
}

const PostList = () => {
    const { posts, loading, error } = useFetchPosts();
console.log(posts)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Tistory Posts</h1>
            <ul>
                {posts?.map((post: PostType, index: number) => (
                    <li key={index}> {/* ref를 key로 대체 */}
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                            <div>{post.title}</div>
                        </a>
                        <p>{post.content}</p> {/* content를 description으로 변경 */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
