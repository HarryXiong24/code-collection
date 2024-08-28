import VirtualScroll from '../components/virtual-scroll';

// Mock Data
const total = 200;
// const data = new Array(total).fill(null).map((_, index) => index);

const getData = async (data: { pageNum: number; pageSize: number }) => {
  const url = `https://picsum.photos/v2/list?page=${data.pageNum}&limit=${data.pageSize}`;

  const res = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return {
        list: data,
        total: total, // 假设一共有 total 组数据
      };
    });

  return res;
};

const DemoVirtualScroll = () => {
  return (
    <div style={{ padding: 8 }}>
      <h2>Demo Virtual Scroll</h2>
      <VirtualScroll
        total={total}
        containerHeight={500}
        // dataSource={data}
        visibleItemsCount={20}
        rowHeight={60}
        style={{ border: '1px solid black' }}
        renderItem={(item: any, index) => {
          return (
            <div key={index} style={{ padding: '0 8px' }}>
              <p>
                {item.id}: {item.author}
              </p>
              <a href={item.url}>{item.url}</a>
            </div>
          );
        }}
        fetchData={getData}
      />
    </div>
  );
};

export default DemoVirtualScroll;
