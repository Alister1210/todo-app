"use client";
import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [newTaskValue, setnewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setnewTaskValue("");
    setmodalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setmodalOpen(true)}
        className="btn btn-primary w-full font-medium text-xl"
      >
        Add new task <AiOutlinePlus className="ml-2 text-center" size={30} />
      </button>
      <Modal modalOpen={modalOpen} setmodalOpen={setmodalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg mb-5">Add new Task</h3>
          <div id="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setnewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask;
