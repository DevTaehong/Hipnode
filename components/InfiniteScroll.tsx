"use client";

import { useEffect, useState, ReactNode, Fragment } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "@/components/Spinner";
import OutlineIcon from "@/components/icons/outline-icons";
interface InfiniteScrollProps<T extends { id: number }> {
  fetchData: (myCursorId: number) => Promise<T[]>;
  initialData: T[];
  renderItem: (item: T) => ReactNode;
  className: string;
}

const InfiniteScroll = <T extends { id: number }>({
  fetchData,
  initialData,
  renderItem,
  className,
}: InfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);

    const myCursorId = data[data.length - 1]?.id;
    const newData = await fetchData(myCursorId);
    setData((prevData: T[]) => [...prevData, ...newData]);

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView || isSeeMore) {
      loadMoreData();
      setIsSeeMore(false);
    }
  }, [inView, isSeeMore]);

  return (
    <>
      <div className={className}>
        {data.map((item) => (
          <Fragment key={item.id}>{renderItem(item)}</Fragment>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsSeeMore(true)}
        className="regular-10 ml-5 mt-2 flex items-center gap-2.5 text-sc-3 lg:hidden"
      >
        See more
        <OutlineIcon.ArrowRight className="stroke-sc-3" />
      </button>
      <div className="hidden lg:block" ref={ref}>
        <div className="flex items-center justify-center p-3">
          {isLoading && <Spinner />}
        </div>
      </div>
    </>
  );
};
export default InfiniteScroll;
