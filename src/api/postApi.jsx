export const fetchPosts = async () => {
  const response = await fetch('https://67446e69b4e2e04abea22dd9.mockapi.io/wiser-products');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};
