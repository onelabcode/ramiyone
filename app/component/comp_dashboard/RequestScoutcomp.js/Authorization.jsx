import useProfileStore from "@/app/store/coachAndScout";
import React, { useEffect, useState } from "react";
import { ScoutTable } from "./Authorizations/scout-table";
import { ScoutDetails } from "./Authorizations/scout-details";
import { toast, Toaster } from "sonner";
import Loading from "../../Loading";
const Authorization = () => {
  const { fetchScoutProfiles, Profiles, updateScoutProfileStatus } =
    useProfileStore();

  const [selectedScout, setSelectedScout] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleStatusChange = (id, status, profile) => {
    updateScoutProfileStatus(id, status, profile);
    toast.message(`Request has been ${status} sucessfully`);
  };

  const handleViewDetails = (scout) => {
    setSelectedScout(scout);
    setDetailsOpen(true);
  };

  useEffect(() => {
    fetchScoutProfiles();
  }, []);

  return (
    <>
      {Profiles ? (
        <>
          <ScoutTable
            scouts={Profiles}
            onViewDetails={handleViewDetails}
            onStatusChange={handleStatusChange}
          />

          <ScoutDetails
            scout={selectedScout}
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
          />
          <Toaster position="bottom-right" richColors />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Authorization;
