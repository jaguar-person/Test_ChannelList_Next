import { ChannelListType } from "@/types";
import React from "react";

interface TableProps {
  data: ChannelListType[];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <div className="px-3 w-full md:w-fit flex items-center justify-center mx-1 sm:mx-3 text-xs md:text-sm">
    <div className="container">
      <table className="flex flex-row flex-no-wrap sm:bg-white md:rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white ">
          {data.map((item, i) => (
            <tr
              className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              key={i}
            >
              <th>Short Channel ID</th>
              <th>Long Channel ID</th>
              <th>Age</th>
              <th>Capacity</th>
              <th>Last Update</th>
            </tr>
          ))}
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {data?.map((item) => (
            <tr
              className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              key={item.long_channel_id}
            >
              <td className="td-class">
                <span>{item.short_channel_id}</span>
              </td>
              <td className="td-class">
                <span>{item.long_channel_id}</span>
              </td>
              <td className="td-class truncate">
                <span>{item.block_age}</span>
              </td>
              <td className="td-class truncate">{item.capacity}</td>
              <td className="td-class truncate">{item.last_update_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
