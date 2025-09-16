import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetApis(endpoint ,page=null){
    var { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [endpoint, page],
    queryFn: () => {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/${endpoint}?page=${page}`
      );
    },
  });
  return{ data, isLoading, isFetching, isError, error }
}



