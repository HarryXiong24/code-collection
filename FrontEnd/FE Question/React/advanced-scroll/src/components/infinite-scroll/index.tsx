import { ReactNode, useEffect } from 'react';
import useIsInView from '../../hooks/useIsInView';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export interface InfiniteScrollProps {
  renderItem: <T>(item: T, index: number) => ReactNode;
  fetchData: <T>(params: { pageSize: number; pageNum: number }) => Promise<{
    total?: number; // 总数据数
    list?: T[]; // 当前页的数据列表
  }>;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { renderItem, fetchData } = props;
  const [targetRef, isInView] = useIsInView();

  const { data, hasMore, loadMore } = useInfiniteScroll({
    pageSize: 10, // 一次性加载10条
    fetchData: fetchData,
  });

  useEffect(() => {
    if (isInView && hasMore) {
      loadMore();
    }
  }, [hasMore, isInView, loadMore]);

  return (
    <div>
      {data?.map(renderItem)}
      <div ref={targetRef as any} style={{ padding: '4px 0', marginBottom: '10px' }}>
        {hasMore ? 'Loading...' : 'No More'}
      </div>
    </div>
  );
};

export default InfiniteScroll;
