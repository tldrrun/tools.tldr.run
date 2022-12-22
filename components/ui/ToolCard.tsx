import classNames from "classnames";
import Link from "next/link";
import React from "react";

type ToolCardProps = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  operating_systems: string[];
  license: string;
  availability: string[];
  github_url: string;
  url: string;
  featured: boolean;
};

export default function ToolCard({
  id,
  name,
  description,
  license,
  featured = false,
}: ToolCardProps) {
  return (
    <div
      className={classNames(
        "bg-white border rounded shadow-sm flex flex-col group",
        {
          "border-sky-400 shadow": featured,
        }
      )}
    >
      <p className="mb-3 text-xs font-semibold tracking-wide uppercase px-8 pt-8 flex gap-2">
        <a
          href={license ? `https://opensource.org/licenses/${license}` : "#"}
          target={license ? "_blank" : "_self"}
          rel="noopener"
          className={`transition-colors duration-200 ${
            license ? "" : "pointer-events-none cursor-default"
          }`}
          aria-label="Category"
        >
          {license || "No license specified"}
        </a>
      </p>
      <Link
        href={`/tool/${id}`}
        aria-label="Tool"
        title={name}
        className="px-8 inline-block mb-3 text-2xl font-bold leading-7 text-black transition-colors duration-200">

        {name}

      </Link>
      <p className="px-8 mb-4 text-slate-500 line-clamp-3 md:line-clamp-5 flex-1">
        {description}
      </p>
      <div
        className={classNames(
          "grid grid-cols-2 items-center text-center border-t opacity-0 group-hover:opacity-100 transition-opacity",
          {
            "border-sky-400 text-sky-600": featured,
          }
        )}
      >
        <Link
          href={`/tool/${id}`}
          aria-label={name}
          title={`${name} tool page`}
          className="p-3 hover:bg-slate-100">
          
            View
          
        </Link>
        <Link
          href="/"
          aria-label={name}
          title={`${name} tool page`}
          className="p-3 hover:bg-slate-100">
          
            Run →
          
        </Link>
      </div>
    </div>
  );
}
