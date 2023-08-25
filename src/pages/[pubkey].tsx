import { GetServerSideProps, NextPage } from "next";
import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { ChannelListType } from "@/types";
import Table from "@/components/Table";

interface ChannelListProps {
  channelList: ChannelListType[];
}

const ChannelListPage: NextPage<ChannelListProps> = ({ channelList }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex flex-col items-center mt-5 font-sans overflow-hidden">
        <div className="text-4xl text-gray-700 text-center">Channel List</div>
        <Table channelList={channelList} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ChannelListProps> = async (
  context
) => {
  const pubkey = context.params?.pubkey as string;
  const { data } = await client.query({
    query: GET_NODE,
    variables: {
      pubkey: pubkey,
      page: { limit: 10, offset: 0 },
      order: { by: "capacity", direction: "DESC" },
    },
  });

  const channelList = data.getNode.graph_info.channels.channel_list.list;

  return {
    props: {
      channelList,
    },
  };
};

export default ChannelListPage;
