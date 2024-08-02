const axios = require('axios');
const fs = require('fs');
const path = require('path');

const TISTORY_URL = 'https://1two13.tistory.com/rss'; // Tistory RSS URL
const OUTPUT_DIR = path.join(__dirname, '../posts');

// 게시물 데이터를 가져오는 함수
const fetchPosts = async () => {
    try {
        const response = await axios.get(TISTORY_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
};

// 게시물 파일로 저장하는 함수
const savePosts = (data) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'posts.xml'), data);
};

// 메인 함수
const run = async () => {
    const data = await fetchPosts();
    savePosts(data);
    console.log('Posts have been saved.');
};

run();
