import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { TodoDto } from "./../containers/home/types";
import URL from "src/constants";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (todo: TodoDto) =>
      axios.delete(`${URL}/todos/${todo.id}`).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  );
};

export { useDeleteTodo };
