import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import URL from "src/constants";
import { TodoDto } from "./../containers/home/types";

const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (todo: TodoDto) => axios.post(`${URL}/todos`, todo).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
};

export { useCreateTodo };
