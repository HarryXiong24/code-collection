import InfiniteScroll from './demo-infinite-scroll';
import DemoIsInView from './demo-is-in-view';
import DemoVirtualScroll from './demo-virtual-scroll';

const AdvancedScroll = () => {
  return (
    <div style={{ padding: 8 }}>
      <div>
        <DemoIsInView />
      </div>
      <div>
        <DemoVirtualScroll />
      </div>
      <div>
        <InfiniteScroll />
      </div>
    </div>
  );
};

export default AdvancedScroll;
