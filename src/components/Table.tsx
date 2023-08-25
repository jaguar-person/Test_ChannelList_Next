import React from "react";
import { ChannelListType } from "@/types";

interface TableProps {
  channelList: ChannelListType[];
}

const Table: React.FC<TableProps> = ({ channelList }) => (
  <div className="px-3 w-full md:w-fit flex items-center justify-center mx-1 sm:mx-3 text-xs md:text-sm">
    <div className="container">
      <table className="flex flex-row flex-no-wrap sm:bg-white md:rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          {channelList.map((item, i) => (
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
        <tbody className="flex-1 sm:flex-none text-gray-700">
          {channelList?.map((item) => (
            <tr
              className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              key={item.long_channel_id}
            >
              <td className="td-class">{item.short_channel_id}</td>
              <td className="td-class">{item.long_channel_id}</td>
              <td className="td-class">{item.block_age}</td>
              <td className="td-class">{item.capacity}</td>
              <td className="td-class truncate">{item.last_update_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
