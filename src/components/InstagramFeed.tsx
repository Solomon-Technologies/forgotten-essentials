import { useState } from 'react';
import './InstagramFeed.css';

interface InstagramPost {
  id: string;
  image: string;
  link: string;
  caption?: string;
}

// Manual Instagram posts - Update these with actual Instagram post URLs and images
const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example1',
    caption: 'New vintage finds dropping soon 🔥',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example2',
    caption: 'Thrift haul from this weekend',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example3',
    caption: 'Vintage denim collection',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example4',
    caption: 'New arrivals in store',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example5',
    caption: 'Behind the scenes',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop',
    link: 'https://instagram.com/p/example6',
    caption: 'Style inspo for the week',
  },
];

export default function InstagramFeed() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemWidth = 300; // Width of each item + gap
  const maxScroll = (instagramPosts.length - 4) * itemWidth; // Show 4 items at a time

  const scroll = (direction: 'left' | 'right') => {
    const newPosition = direction === 'left'
      ? Math.max(0, scrollPosition - itemWidth * 2)
      : Math.min(maxScroll, scrollPosition + itemWidth * 2);

    setScrollPosition(newPosition);
  };

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

      <div className="instagram-carousel-container">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll('left')}
          disabled={scrollPosition === 0}
          aria-label="Previous posts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="instagram-carousel">
          <div
            className="instagram-track"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {instagramPosts.map((post) => (
              <a
                key={post.id}
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

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          disabled={scrollPosition >= maxScroll}
          aria-label="Next posts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
