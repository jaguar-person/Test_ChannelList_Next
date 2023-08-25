import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ChannelListType, PaginationType } from "@/types";
import Table from "@/components/Table";

const Home: NextPage<any> = (data) => {
  const [channelList, setChannelList] = useState([] as ChannelListType[]);
  useEffect(() => {
    setChannelList(data.data.getNode.graph_info.channels.channel_list.list);
  }, [data]);
  console.log(channelList);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex flex-col items-center mt-40 font-sans overflow-hidden">
        <div className="text-4xl text-gray-700">Channel List</div>
        <Table data={channelList} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_NODE,
    variables: {
      pubkey:
        "03006fcf3312dae8d068ea297f58e2bd00ec1ffe214b793eda46966b6294a53ce6",
      page: { limit: 10, offset: 0 },
      order: { by: "capacity", direction: "DESC" },
    },
  });
  return {
    props: {
      data,
    },
  };
}

export default Home;
