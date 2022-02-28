import React from "react";
import { useForm } from "react-hook-form";

import { TodoDto } from "../types";

const PlusIcon = () => {
  return (
    <svg
      className="text-white h-8 w-8"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

type FormProps = {
  handleFormSubmit: (data: TodoDto) => void;
  formValues: TodoDto;
};

const Form = ({ handleFormSubmit, formValues }: FormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TodoDto>();
  const onSubmit = (data: TodoDto) => {
    if (!errors.content) {
      handleFormSubmit(data);
      reset();
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`${
          !!errors.content ? "border border-red-500" : "border border-white"
        } bg-white flex items-center rounded-full shadow-xl`}
      >
        {formValues.id ? (
          <input
            type="hidden"
            {...register("id", {
              required: true,
            })}
            defaultValue={formValues.id}
          />
        ) : null}
        <input
          type="hidden"
          {...register("isComplete", {
            required: true,
          })}
          defaultValue={formValues.isComplete}
        />
        <input
          type="text"
          {...register("content", {
            required: true,
          })}
          defaultValue={formValues.content}
          className="rounded-l-full w-full py-4 px-6 text-gray-500 leading-tight focus:outline-none"
          placeholder="Write a new task"
        />

        <div className="p-4">
          <button className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            <PlusIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export { Form };
