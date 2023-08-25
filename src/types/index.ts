export type ChannelListType = {
  block_age: number;
  capacity: string;
  chan_point: string;
  last_update: number;
  last_update_date: string;
  long_channel_id: string;
  node1_policy: Object;
  node1_pub: string;
  node2_info: Object;
  node2_policy: Object;
  node2_pub: string;
  short_channel_id: string;
};

export type PaginationType = {
  limit: number;
  offset: number;
};
