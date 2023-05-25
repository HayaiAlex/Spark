const API_DEV_URL = 'https://localhost:7236';
const API_PRODUCTION_URL = 'https://spark-dotnetserver.azurewebsites.net';

const ENDPOINTS = {
    GET_ALL_POSTS: 'get-all-posts',
    GET_POST_BY_ID: 'get-post-by-id',
    CREATE_POST: 'create-post',
    UPDATE_POST: 'update-post',
    DELETE_POST_BY_ID: 'delete-post-by-id',
};

const development = {
    getAllPosts: `${API_DEV_URL}/${ENDPOINTS.GET_ALL_POSTS}`,
    getPostById: `${API_DEV_URL}/${ENDPOINTS.GET_POST_BY_ID}`,
    createPost: `${API_DEV_URL}/${ENDPOINTS.CREATE_POST}`,
    updatePost: `${API_DEV_URL}/${ENDPOINTS.UPDATE_POST}`,
    deletePostById: `${API_DEV_URL}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

const production = {
    getAllPosts: `${API_PRODUCTION_URL}/${ENDPOINTS.GET_ALL_POSTS}`,
    getPostById: `${API_PRODUCTION_URL}/${ENDPOINTS.GET_POST_BY_ID}`,
    createPost: `${API_PRODUCTION_URL}/${ENDPOINTS.CREATE_POST}`,
    updatePost: `${API_PRODUCTION_URL}/${ENDPOINTS.UPDATE_POST}`,
    deletePostById: `${API_PRODUCTION_URL}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

const endpoints = process.env.NODE_ENV === 'production' ? production : development;

export default endpoints;