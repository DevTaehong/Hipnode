import {
  fetchUsersNameAndId,
  getAllUsers,
  getUserById,
  getPostsByUserId,
  getMostPopularPosts,
  getPostsWithMostLikes,
  getPostsByTag,
} from '@/utils/fetchData';

const page = async () => {
  const usersByName = await fetchUsersNameAndId();
  console.log(usersByName);
  const allUsers = await getAllUsers();
  console.log(allUsers);
  const userById = await getUserById(6);
  console.log(userById);
  const postsByUserId = await getPostsByUserId(4);
  console.log(postsByUserId);
  const mostPopularPosts = await getMostPopularPosts();
  console.log(mostPopularPosts);
  const postsWithMostLikes = await getPostsWithMostLikes();
  console.log(postsWithMostLikes);
  const postsByTag = await getPostsByTag('music');
  console.log(postsByTag);

  return <div>page</div>;
};

export default page;
