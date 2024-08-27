import InfiniteScroll from './demo/demo-infinite-scroll';
import DemoIsInView from './demo/demo-is-in-view';
import DemoVirtualScroll from './demo/demo-virtual-scroll';

const App = () => {
  return (
    <div>
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

export default App;
