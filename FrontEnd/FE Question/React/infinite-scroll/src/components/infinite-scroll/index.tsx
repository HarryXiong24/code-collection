import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';

// Item component to render each item
const Item = ({ data, index, style }) => (
  <div style={style}>
    <img src={data[index].imageUrl} alt={data[index].title} loading='lazy' style={{ width: '100%', height: 'auto' }} />
    <p>{data[index].title}</p>
  </div>
);

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const PAGE_SIZE = 20;
  const API_URL = 'https://api.example.com/data'; // Replace with your actual API URL

  const fetchMoreData = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`${API_URL}?page=${Math.floor(data.length / PAGE_SIZE) + 1}&size=${PAGE_SIZE}`);
      setData((prev) => [...prev, ...res.data]);
      if (res.data.length < PAGE_SIZE) {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data.length, hasMore, loading]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchMoreData, hasMore]
  );

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      {/* Virtualized list for large datasets */}
      <List
        height={600} // Viewport height
        itemCount={data.length}
        itemSize={100} // Each row height
        itemData={data}
        width='100%'
      >
        {Item}
      </List>

      {/* Loading and error states */}
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error loading data. <button onClick={fetchMoreData}>Retry</button>
        </div>
      )}
      {!hasMore && <div>No more data to load.</div>}

      {/* Observer element for triggering more data load */}
      <div ref={lastItemRef} />
    </div>
  );
};

export default InfiniteScroll;
