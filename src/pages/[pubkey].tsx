import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { ChannelListType } from "@/types";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { channel } from "diagnostics_channel";

interface ChannelListProps {
  channelList: ChannelListType[];
  pubkey: string;
  currentPage: number;
  errorStatus: boolean;
}

const ChannelListPage: NextPage<ChannelListProps> = ({
  channelList,
  pubkey,
  currentPage,
  errorStatus,
}) => {
  const router = useRouter();
  const [currentPageState, setCurrentPage] = useState(currentPage);

  const handleCurrentPage = (index: number) => {
    if (!(currentPageState === 0 && index < 0) && !errorStatus) {
      setCurrentPage(currentPageState + index);
      router.push(`${pubkey}/?page=${currentPageState + index}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex flex-col items-center mt-5 font-sans overflow-hidden mb-10">
        <div className="text-4xl text-gray-700 text-center">Channel List</div>
        {errorStatus ? (
          <div className="text-red-600 text-3xl py-6">Invaild Pub Key!</div>
        ) : (
          <Table channelList={channelList} />
        )}
        {!errorStatus && (
          <Pagination
            currentPage={currentPageState}
            handleCurrentPage={handleCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ChannelListProps> = async (
  context
) => {
  const pubkey = context.params?.pubkey as string;
  const currentPage = parseInt(context.query.page as string, 10) || 0;

  let channelList = [] as ChannelListType[];
  let errorStatus = false;

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/channel_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pubkey: pubkey,
        currentPage: currentPage,
      }),
    });
    const data = await response.json();
    channelList = data.channelList;
  } catch (error) {
    console.log("Error", error);
    errorStatus = true;
  }

  return {
    props: {
      channelList,
      pubkey,
      currentPage,
      errorStatus,
    },
  };
};

export default ChannelListPage;
