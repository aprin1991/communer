import { useCreateTodo, useDeleteTodo, useTodos, useUpdateTodo } from "@hooks";
import React, { useState } from "react";
import Alert from "./compoents/alert";
import { Form } from "./compoents/form";
import { Loading } from "./compoents/loading";
import { Todos } from "./compoents/todos";
import { TodoDto } from "./types";
const defaultTodoFormValues: TodoDto = {
  content: "",
  isComplete: "0",
};

function Home() {
  const { data: todos, isError, isLoading } = useTodos();
  const [todoFormValues, setTodoFormValues] = useState<TodoDto>(
    defaultTodoFormValues
  );
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();
  const handleFormSubmit = (data: TodoDto) => {
    data.id ? updateTodoMutation.mutate(data) : createTodoMutation.mutate(data);
    setTodoFormValues({ content: "", isComplete: "0" });
  };
  const handleDeleteTodo = (data: TodoDto) => {
    deleteTodoMutation.mutate(data);
  };
  const handleIscompleteTodo = (data: TodoDto) => {
    data.isComplete = +data.isComplete ? "0" : "1";
    updateTodoMutation.mutate(data);
  };
  const handleUpdateTodo = (data: TodoDto) => {
    setTodoFormValues(data);
  };

  return (
    <div className="w-full mt-3">
      {isError && <Alert />}
      {isLoading ? (
        <Loading />
      ) : (
        <Todos
          handleDeleteTodo={handleDeleteTodo}
          handleIscompleteTodo={handleIscompleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          todos={todos}
        />
      )}
      <Form
        handleFormSubmit={handleFormSubmit}
        formValues={todoFormValues}
      ></Form>
    </div>
  );
}

export default Home;
