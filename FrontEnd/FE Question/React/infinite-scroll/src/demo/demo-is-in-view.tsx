import useIsInView from '../hooks/useIsInView';

const DemoIsInView = () => {
  const [targetRef, inView] = useIsInView();

  return (
    <div style={{ padding: 8 }}>
      <h2>Demo is in view</h2>
      <p>If all the div in view, background color is green. Otherwise, it is red.</p>
      <div
        ref={targetRef as any}
        style={{
          height: '100px',
          background: inView ? 'green' : 'red',
        }}
      >
        {inView ? 'In View' : 'Out of View'}
      </div>
    </div>
  );
};

export default DemoIsInView;
