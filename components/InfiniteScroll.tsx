"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";

// LINK - https://www.youtube.com/watch?v=UWwUWpcFEBM
interface InfiniteScrollProps<T extends { id: number }> {
  fetchData: (myCursorId: number) => Promise<T[]>;
  initialData: T[];
  renderItem: (item: T) => React.ReactNode;
}

const InfiniteScroll = <T extends { id: number }>({
  fetchData,
  initialData,
  renderItem,
}: InfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);

    const myCursorId = data[data.length - 1]?.id;
    const newData = await fetchData(myCursorId);
    setData((prevData: T[]) => [...prevData, ...newData]);

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  return (
    <>
      {data.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
      <div className="flex items-center justify-center p-4" ref={ref}>
        {isLoading && <Spinner />}
      </div>
    </>
  );
};
export default InfiniteScroll;
