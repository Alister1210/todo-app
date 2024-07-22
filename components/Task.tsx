"use client";
import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [taskToEdit, settaskToEdit] = useState<string>(task.text);
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setopenModalDelete] = useState<boolean>(false);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setopenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setopenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full text-lg ">{task.text}</td>
      <td className="flex gap-5">
        <FaRegEdit
          onClick={() => setopenModalEdit(true)}
          cursor="pointer"
          className="text-blue-600"
          size={25}
        />

        <Modal modalOpen={openModalEdit} setmodalOpen={setopenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg mb-5">Edit Task</h3>
            <div id="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => settaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <button type="submit" className=" ml-4 btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FaTrashCan
          onClick={() => setopenModalDelete(true)}
          cursor="pointer"
          className="text-red-600"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setmodalOpen={setopenModalDelete}>
          <h3 className="text-lg mb-2" >
            Are you sure, you wnat to delete this task?
          </h3>
          <div className="model-action flex items-center justify-center">
            <button
              onClick={() => {
                handleDeleteTask(task.id);
              }}
              className="btn"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
