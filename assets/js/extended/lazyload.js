document.addEventListener('DOMContentLoaded', () => {
  const postContainer = document.querySelector('.post-entry').parentElement;
  const loadingIndicator = document.createElement('div');
  let currentPage = 1;
  let loading = false;
  let hasMore = true;
  let retryCount = 0;
  const MAX_RETRIES = 3;

  if (!postContainer) return;

  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.textContent = 'Loading more posts...';
  loadingIndicator.style.display = 'none';
  postContainer.parentNode.insertBefore(loadingIndicator, postContainer.nextSibling);

  function getCurrentPath() {
    const path = window.location.pathname;
    return path.endsWith('/') ? path : `${path}/`;
  }

  async function loadPosts() {
    if (loading || !hasMore) return;
    
    loading = true;
    loadingIndicator.style.display = 'block';
    
    const currentPath = getCurrentPath();
    const nextPage = currentPage + 1;
    const nextPageUrl = `${currentPath}page/${nextPage}/`;

    try {
      const response = await fetch(nextPageUrl, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          hasMore = false;
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const newPosts = Array.from(doc.querySelectorAll('.post-entry'));
      
      if (newPosts.length === 0) {
        hasMore = false;
        return;
      }

      newPosts.forEach((post, index) => {
        const clone = document.importNode(post, true);
        clone.style.animationDelay = `${index * 0.1}s`;
        postContainer.appendChild(clone);
      });

      currentPage = nextPage;
      retryCount = 0;

    } catch (error) {
      if (++retryCount < MAX_RETRIES) {
        setTimeout(loadPosts, 2000);
      } else {
        hasMore = false;
      }
    } finally {
      loading = false;
      loadingIndicator.style.display = 'none';
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) loadPosts();
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  function observeLastPost() {
    const posts = document.querySelectorAll('.post-entry');
    if (posts.length > 0) {
      observer.observe(posts[posts.length - 1]);
    }
  }

  observeLastPost();

  const mutationObserver = new MutationObserver(observeLastPost);
  mutationObserver.observe(postContainer, { childList: true });
});
