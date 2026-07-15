import { useEffect, useState, useRef } from 'react';
import type { RefObject } from 'react';

type TargetRef = RefObject<HTMLElement | undefined>;

const useIsInView = (
  options: IntersectionObserverInit = {
    root: null, // root: 用来作为目标元素的根元素的祖先元素。如果没有指定，默认是浏览器的视口（null）。
    rootMargin: '0px', // rootMargin: 用来扩大或缩小 root 元素的视口边界，类似于 CSS 的 margin。可以用像素（px）或百分比（%）来定义
    threshold: 1, // threshold: 一个数组或单个数值，表示当目标元素与 root 元素相交的比例到达此值时触发回调。取值范围为 0 到 1
  },
  triggerOnce: boolean = false
): [TargetRef, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const targetRef: TargetRef = useRef<HTMLElement | undefined>(undefined);

  // callback函数的参数接收两个参数 entries 和 observer：
  // 1. entries：这是一个数组，每个成员都是一个被观察对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，那么  entries 数组里面就会打印出两个元素，如果只观察一个元素，我们打印 entries[0]就能获取到被观察对象
  // 2. observer: 这个是监视器本身
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 元素可见
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else {
        setIsInView(false);
      }
    });
  }, options);

  useEffect(() => {
    // 决定要监听的元素
    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef?.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options, triggerOnce]);

  return [targetRef, isInView];
};

export default useIsInView;
