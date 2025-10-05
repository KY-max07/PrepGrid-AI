import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { CARD_BG } from "../../utils/data";
import SummaryCard from "../../components/cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionFrom";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import toast from "react-hot-toast";
import { FaBolt } from "react-icons/fa6";

const DashBoard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log(response.data);
      setSessions(response.data);
    } catch (err) {
      console.log("error fetching sessions data", err);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      if (!sessionData?._id) {
        toast.error("Invalid session ID");
        setOpenDeleteAlert({ open: false, data: null });
        return;
      }

      console.log("Deleting session with ID:", sessionData._id);
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionData._id)
      );
      console.log("Delete response:", response);

      // Close the modal first
      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      toast.success("Session Deleted Successfully");

      // Refresh sessions
      await fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
      console.error("Error details:", error.response?.data);
      toast.error("Failed to delete session");

      // Close modal even on error after showing the error message
      setTimeout(() => {
        setOpenDeleteAlert({ open: false, data: null });
      }, 2000);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashBoardLayout>
      <div className="container mx-auto  bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-2 md:px-4">
          {sessions.length === 0 && (
            <div className="col-span-3 flex items-center justify-center gap-4 flex-col w-full h-[50vh]">
              <h1 className="text-xl text-neutral-400">No sessions found. Create a new session to get started.</h1>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="bg-linear bg-amber-200 px-4 rounded-full hover:bg-amber-300 transition-colors duration-300 ease-in-out text-neutral-950"
              >
                Create New Session
              </button>
            </div>
          )}
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdatedAt={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/prep-grid/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear bg-amber-200 px-4 rounded-full fixed bottom-15 right-10"
          onClick={() => setOpenCreateModal(true)}
        >
          Add New
        </button> */}
        <button
          onClick={() => setOpenCreateModal(true)}
          class="fixed md:bottom-10 md:right-10 bottom-2 right-2 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group bg-neutral-950 text-sm md:text-md"
        >
          <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>

          <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

          <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

          <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

          <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
          <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
          <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span class="relative flex items-center justify-center gap-2">
            ADD NEW
            <FaBolt />
          </span>
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      {setOpenDeleteAlert && (
        <Modal
          isOpen={openDeleteAlert.open}
          onClose={() => {
            setOpenDeleteAlert({ open: false, data: null });
          }}
          title="Delete Alert"
        >
          <div className="w-[30vw]">
            <DeleteAlertContent
              content="Are you sure you want to delete this session detail?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
              onCancel={() => setOpenDeleteAlert({ open: false, data: null })}
            />
          </div>
        </Modal>
      )}
    </DashBoardLayout>
  );
};

export default DashBoard;
