import { Vertical } from "@components/container";
import { useAppContext } from "@context";

export const UserProfile = () => {
  const { user } = useAppContext();
  return <Vertical>{user?.name}</Vertical>;
};
