import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { ChannelListType } from "@/types";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";

interface ChannelListProps {
  channelList: ChannelListType[];
  pubkey: string;
  currentPage: number;
}

const ChannelListPage: NextPage<ChannelListProps> = ({
  channelList,
  pubkey,
  currentPage,
}) => {
  const router = useRouter();
  const [currentPageState, setCurrentPage] = useState(currentPage);

  const handleCurrentPage = (index: number) => {
    if (!(currentPageState === 0 && index < 0))
      setCurrentPage(currentPageState + index);
    router.push(`${pubkey}/?page=${currentPageState + index}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex flex-col items-center mt-5 font-sans overflow-hidden mb-10">
        <div className="text-4xl text-gray-700 text-center">Channel List</div>
        <Table channelList={channelList} />
        <Pagination
          currentPage={currentPageState}
          handleCurrentPage={handleCurrentPage}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ChannelListProps> = async (
  context
) => {
  const pubkey = context.params?.pubkey as string;
  const currentPage = parseInt(context.query.page as string, 10) || 0;

  const { data } = await client.query({
    query: GET_NODE,
    variables: {
      pubkey: pubkey,
      page: { limit: 10, offset: currentPage },
      order: { by: "capacity", direction: "ASC" },
    },
  });

  const channelList = data.getNode.graph_info.channels.channel_list.list;

  return {
    props: {
      channelList,
      pubkey: pubkey,
      currentPage: currentPage,
    },
  };
};

export default ChannelListPage;
