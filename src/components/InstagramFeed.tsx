import { useState } from 'react';
import { useInstagramPosts } from '../hooks/useShopify';
import './InstagramFeed.css';

export default function InstagramFeed() {
  // Fetch up to 50 posts - owner can add as many as they want (up to 50)
  const { posts: instagramPosts, loading } = useInstagramPosts(50);
  const [isHovered, setIsHovered] = useState(false);

  // Triple posts for seamless infinite scroll effect
  const duplicatedPosts = [...instagramPosts, ...instagramPosts, ...instagramPosts];

  return (
    <section className="instagram-feed">
      <div className="instagram-header">
        <h2>Follow Us @forgottenessentials</h2>
        <a
          href="https://instagram.com/forgottenessentials"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-follow-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
          Follow on Instagram
        </a>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading Instagram feed...</p>
        </div>
      ) : instagramPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No Instagram posts to display</p>
        </div>
      ) : (
        <div
          className="instagram-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="instagram-carousel">
            <div
              className={`instagram-track ${isHovered ? 'paused' : ''}`}
            >
              {duplicatedPosts.map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-post"
              >
                <img src={post.image} alt={post.caption || 'Instagram post'} />
                <div className="instagram-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
        </div>
      )}
    </section>
  );
}
