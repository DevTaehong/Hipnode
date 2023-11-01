import Image from "next/image";

const PerformanceCard = () => {
  return (
    <article className="flex items-center">
      <Image
        src="/postCardPlacholder.png"
        alt="content"
        width={50}
        height={50}
        className="w-full"
      />

      <div className="flex justify-between">
        <section>
          <p>Views</p>
          <p>651,334</p>
        </section>

        <section>
          <p>Like</p>
          <p>651,334</p>
        </section>

        <section>
          <p>Comments</p>
          <p>651,334</p>
        </section>
      </div>
    </article>
  );
};

export default PerformanceCard;
