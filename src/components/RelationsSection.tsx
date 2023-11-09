"use client";

import { FC, memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { aniGQInfoType } from "@/types/aniGQType";

interface RelationsSectionProps {
  data: aniGQInfoType["data"]["Media"]["relations"]["edges"];
}

const RelationsSection: FC<RelationsSectionProps> = ({ data }) => {
  const [length, setLength] = useState<number>(3);
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <div className="flex gap-5 items-center">
        <h2 className="p-3 lg:p-0 text-[20px] lg:text-2xl font-bold">
          Relations
        </h2>
      </div>
      <div className="w-full gap-5 snap-x scroll-px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center px-3 lg:px-4 rounded-xl mb-10">
        {data.length > 0 ? (
          <AnimatePresence initial={false}>
            {data.slice(0, length).map(({ node, relationType }, i: number) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hover:scale-[1.02] snap-start scale-100 transition-transform duration-200 ease-out w-full "
                >
                  <Link
                    href={`/${node.type === "ANIME" ? "anime" : "manga"}/${
                      node.id
                    }`}
                    className="w-full md:w-[400px] lg:w-full h-[126px] border flex rounded-md"
                  >
                    <div className="relative rounded-l-md shrink-0">
                      <Image
                        src={
                          node.coverImage.extraLarge || node.coverImage.large
                        }
                        alt={node.title.romaji + " image"}
                        width={90}
                        height={126}
                        className={`object-cover bg-white ${
                          isLoading && "backdrop-blur-md"
                        } h-[126px] w-[90px] shrink-0 rounded-l-md`}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>
                    <div className="h-full grid px-3 items-center">
                      <div className="text-action font-outfit font-bold">
                        {relationType}
                      </div>
                      <div className="font-outfit font-thin line-clamp-2">
                        {node.title.romaji}
                      </div>
                      <div>{node.type}</div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <span className="font-bold">There&apos;s no relations yet.</span>
        )}
      </div>
      {data.length > 3 && (
        <div className="w-full flex justify-end gap-5 px-3 mb-3">
          {length > 3 && (
            <Button
              variant="outline"
              onClick={() => {
                setLength(3);
              }}
            >
              Show less
            </Button>
          )}
          {length < data.length && (
            <Button onClick={() => setLength(length + 3)} variant="outline">
              Show more
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default memo(RelationsSection);
