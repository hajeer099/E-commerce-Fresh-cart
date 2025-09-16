import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useDetailsApis(endpoint, id, queryType = "params") {
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: ({ queryKey }) => {
      const [endpoint, id] = queryKey;

      // لو النوع queryString (زي brand)
      if (queryType === "query") {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}?brand=${id}`);
      }

      // الافتراضي param زي /brands/id
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}/${id}`);
    },
  });
}
