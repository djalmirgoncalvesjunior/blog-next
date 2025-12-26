import { BlogMenu } from "./blog-menu";
import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="flex flex-row flex items-center justify-between p-4 border-2 border-solid border-b-blue-500">
      <div className="basis-1/3">
        <Link
          href="/"
          className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
          <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
        </Link>
      </div>
      <div className="basis-2/3">
        <BlogMenu />
      </div>
    </header>
  );
}