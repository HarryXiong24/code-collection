import InfiniteScroll from '../components/infinite-scroll';

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
      // 在这里可以处理解析后的数据
      console.log(data);
      return {
        list: data,
        total: 100, // 假设一共有 100 组数据
      };
    });

  return res;
};

const DemoInfiniteScroll = () => {
  return (
    <div style={{ padding: 8 }}>
      <h2>Demo Infinite Scroll</h2>
      <InfiniteScroll
        renderItem={(item: any, index) => {
          return (
            <div key={index} style={{ border: '1px solid black', padding: 8 }}>
              <p>
                {item.id}: {item.author}
              </p>
              <a href={item.url}>{item.url}</a>
            </div>
          );
        }}
        fetchData={getData}
      ></InfiniteScroll>
    </div>
  );
};

export default DemoInfiniteScroll;
