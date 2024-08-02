import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const blogUrl = 'https://1two13.tistory.com/rss';
    const url = proxyUrl + encodeURIComponent(blogUrl);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(url);

                // XML을 파싱하는 브라우저 내장 API 사용
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'text/xml');

                // XML에서 <item> 요소를 추출
                const items = xmlDoc.getElementsByTagName('item');
                const postsArray = Array.from(items).map(item => ({
                    title: item.getElementsByTagName('title')[0]?.textContent,
                    link: item.getElementsByTagName('link')[0]?.textContent,
                    description: item.getElementsByTagName('description')[0]?.textContent,
                }));

                // 추출한 items를 상태로 설정
                // @ts-ignore
                setPosts(postsArray);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useFetchPosts;
