import OpenPost from "@/components/posts/open-post-page/OpenPost";

const Page = async () => {
  return (
    <main className="flex h-screen items-center justify-center bg-light-2 px-5 dark:bg-dark-2">
      <OpenPost />
    </main>
  );
};

export default Page;
