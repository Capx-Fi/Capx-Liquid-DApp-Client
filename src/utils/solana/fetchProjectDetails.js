import { DB_BASE_URL } from "../../constants/config";

export const fetchSolanaProjectDetails = async (projectID) => {
  await (await fetch(`${DB_BASE_URL}checkProject?projectID=${projectID}`))
    .json()
    .then((res) => {
      console.log(res);
      return res;
    });
};
