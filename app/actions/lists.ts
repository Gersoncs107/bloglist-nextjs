import { readinglists } from "@/db/schema";

export type ReadingListEntry = {
  id: number;
  userId: number;
  blogId: number;
  read: boolean;
};