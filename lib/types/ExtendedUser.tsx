import { Avatar, Board, User } from "@prisma/client";

type ExtendedUser = User & { avatar: Avatar; boards: Board[] };

export default ExtendedUser;
