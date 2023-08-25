import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { ChannelListType } from "@/types";
import Table from "@/components/Table";

const ChannelListPage: NextPage<any> = (data) => {
  const [channelList, setChannelList] = useState([] as ChannelListType[]);
  useEffect(() => {
    setChannelList(data.data.getNode.graph_info.channels.channel_list.list);
  }, [data]);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex flex-col items-center mt-40 font-sans overflow-hidden">
        <div className="text-4xl text-gray-700">Channel List</div>
        <Table data={channelList} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const pubkey = context.params?.pubkey as string;
  const { data } = await client.query({
    query: GET_NODE,
    variables: {
      pubkey: pubkey,
      page: { limit: 10, offset: 0 },
      order: { by: "capacity", direction: "DESC" },
    },
  });

  return {
    props: {
      data,
    },
  };
};

export default ChannelListPage;
