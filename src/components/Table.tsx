import { ChannelListType } from "@/types";
import React from "react";

interface TableProps {
  data: ChannelListType[];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <div className="w-full lg:w-5/6">
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">ID</th>
            <th className="py-3 px-6 text-center">AGE</th>
            <th className="py-3 px-6 text-center">CAPACITY</th>
            <th className="py-3 px-6 text-center">LAST_UPDATE</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data?.map((item) => (
            <tr
              className="border-b border-gray-200 hover:bg-gray-100"
              key={item.long_channel_id}
            >
              <td className="py-2 px-4 text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <span>{item.short_channel_id}</span>
                  <span className="font-medium">{item.long_channel_id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  <span>{item.block_age}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  {item.capacity}
                </div>
              </td>
              <td className="py-3 px-6 text-center">{item.last_update_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
