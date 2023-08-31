import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/config/apolloClient";
import { GET_NODE } from "@/graphql/queries";
import { ChannelListType } from "@/types";

type Data = {
  channelList: ChannelListType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const pubkey = req.body.pubkey;
    const currentPage = req.body.currentPage;
    let channelList = [] as ChannelListType[];
    try {
      const { data } = await client.query({
        query: GET_NODE,
        variables: {
          pubkey: pubkey,
          page: { limit: 10, offset: currentPage },
          order: { by: "capacity", direction: "ASC" },
        },
      });
      channelList = data.getNode.graph_info.channels.channel_list.list;
    } catch (err) {
      throw err;
    }
    res.status(200).json({ channelList: channelList });
  } else {
    res.status(405).json({ channelList: [] });
  }
}
