import React from "react";
import Image from "next/image";
import LeftArrowIcon from "@/images/arrow-left.svg";
import RightArrowIcon from "@/images/arrow-right.svg";

interface PaginationProps {
  currentPage: number;
  handleCurrentPage: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handleCurrentPage,
}) => {
  return (
    <div className="pagination flex items-center gap-3">
      <Image
        src={LeftArrowIcon}
        width={16}
        height={16}
        alt="left"
        className="bg-teal-400 rounded-full p-1 w-5 h-5 cursor-pointer"
        onClick={() => {
          handleCurrentPage(-1);
        }}
      />
      <span className="flex items-center justify-center rounded-sm bg-teal-400 text-white w-5 h-5 cursor-pointer text-xs">
        {currentPage}
      </span>
      <Image
        src={RightArrowIcon}
        width={16}
        height={16}
        alt="right"
        className="bg-teal-400 rounded-full p-1 w-5 h-5 cursor-pointer"
        onClick={() => {
          handleCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Pagination;
