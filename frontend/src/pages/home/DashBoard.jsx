import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { CARD_BG } from "../../utils/data";
import SummaryCard from "../../components/cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./createSessionFrom";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import toast from "react-hot-toast";

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
      setSessions(response.data);
    } catch (err) {
      console.log("error fetching sessions data", err);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };
  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashBoardLayout>
      <div className="container mx-auto pt-24 pb-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6">
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

        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear bg-amber-200 px-4 rounded-full fixed bottom-15 right-10"
          onClick={() => setOpenCreateModal(true)}
        >
          Add New
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
      {setOpenDeleteAlert && <Modal
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
          />
        </div>
      </Modal>}
    </DashBoardLayout>
  );
};

export default DashBoard;
