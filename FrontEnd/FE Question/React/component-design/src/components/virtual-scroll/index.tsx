import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import useIsInView from '../../hooks/useIsInView';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export interface VirtualScrollProps<T = any> {
  total: number;
  visibleItemsCount: number;
  containerHeight: number | string;
  rowHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  dataSource?: T[];
  style?: CSSProperties;
  fetchData?: (params: { pageSize: number; pageNum: number }) => Promise<{
    total?: number; // 总数据数
    list?: T[]; // 当前页的数据列表
  }>;
}

const VirtualScroll = <T,>(props: VirtualScrollProps<T>) => {
  const { rowHeight, total, visibleItemsCount, containerHeight, renderItem, dataSource, style, fetchData } = props;
  const [targetRef, isInView] = useIsInView();
  const [scrollTop, setScrollTop] = useState(0); // Current scroll position of the container

  const { data, hasMore, loadMore } = useInfiniteScroll({
    dataSource: dataSource,
    pageSize: visibleItemsCount,
    fetchData: fetchData,
  });

  // 处理滚动事件，更新 scrollTop
  const handleScroll = (e: any) => {
    setScrollTop(e?.currentTarget?.scrollTop);
  };

  const totalHeight = rowHeight * total; // Calculate the total height of the container
  const startNodeElem = Math.ceil(scrollTop / rowHeight); // Get the first element to be displayed
  const offsetY = startNodeElem * rowHeight; // Add padding to the empty space

  // 获取当前可见的数据项
  const visibleData = data.slice(startNodeElem, startNodeElem + visibleItemsCount);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMore();
    }
  }, [hasMore, isInView, loadMore]);

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        padding: '0 8px',
        ...style,
      }}
      onScroll={handleScroll}
    >
      {/* transform: 使用 transform: translateY() 通常会更高效。因为现代浏览器会对 transform 应用硬件加速（GPU 加速）。这意味着浏览器在执行 transform 操作时不需要触发布局重排（reflow），只会触发重绘（repaint）。因此，当你滚动时，使用 transform 可以减少浏览器的计算开销，使动画或滚动更加流畅。 */}
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleData?.map(renderItem)}
          <div ref={targetRef as any} style={{ padding: '4px 8px' }}>
            {hasMore ? 'Loading...' : 'No More'}
          </div>
        </div>
      </div>
      {/* <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>{visibleData}</div>
      </div> */}
    </div>
  );
};

export default VirtualScroll;
