import React from "react";
import { IoSaveSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { PiArrowArcLeftBold } from "react-icons/pi";

interface ButtonActionsProps {
  handleAddUser: () => void;
  onSubmit: () => void;
  handleResetUser: () => void;
}

const ButtonActions: React.FC<ButtonActionsProps> = ({ handleAddUser, onSubmit, handleResetUser }) => {
  return (
    <div className="flex justify-end items-center gap-5 mx-5">
      <button
        type="button"
        className="flex justify-center items-center text-black p-2 hover:bg-[rgba(0,0,0,0.1)] rounded-full"
        onClick={handleAddUser}
      >
        <MdAdd size={18} />
      </button>
      <button
        type="button"
        className="flex justify-center items-center text-black p-2 hover:bg-[rgba(0,0,0,0.1)] rounded-full"
        onClick={onSubmit}
      >
        <IoSaveSharp size={18} />
      </button>
      <button
        type="button"
        className="flex justify-center items-center text-black p-2 hover:bg-[rgba(0,0,0,0.1)] rounded-full"
        onClick={handleResetUser}
      >
        <PiArrowArcLeftBold size={18} />
      </button>
    </div>
  );
};

export default ButtonActions;
