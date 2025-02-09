"use client";
import Announcement from "@/components/feature/comp_dashboard/Announcement";
import AdminPanel from "@/components/feature/comp_dashboard/Authemails";
import BrandLogo from "@/components/feature/comp_dashboard/BrandLogo/BrandLogo";
import ClubNewsDashboard from "@/components/feature/comp_dashboard/ClubNews/ClubNew";
import ContentCreation from "@/components/feature/comp_dashboard/ContentCreation";
import SidebarDash from "@/components/feature/comp_dashboard/Dashsidebar";
import Explorefilter from "@/components/feature/comp_dashboard/Explorefilter";
import ManagerDash from "@/components/feature/comp_dashboard/Manager/ManagerDash";
import Overview from "@/components/feature/comp_dashboard/Overview";
import PlayerApprove from "@/components/feature/comp_dashboard/PlayerApprove/PlayerApprove";
import PlayerManager from "@/components/feature/comp_dashboard/PlayerManager";
import PlayerRequests from "@/components/feature/comp_dashboard/PlayerRequests/PlayerRequests";
import RequestScoute from "@/components/feature/comp_dashboard/RequestScoute";
import TransferNews from "@/components/feature/comp_dashboard/TransferPlayers/TransferNews";
import TrialOut from "@/components/feature/comp_dashboard/Trial_out/Trial_out";
import { withAuth } from "@/components/feature/protected";
import { useState } from "react";

const Dashboard = () => {
  const [page, setPage] = useState("Overview");
  return (
    <>
      <div className="flex">
        <SidebarDash setPage={setPage} />
        <div className="w-full">
          {page === "Overview" && <Overview />}
          {page === "PlayerManager" && <PlayerManager />}
          {page === "Explorefilter" && <Explorefilter />}
          {page === "RequestScoute" && <RequestScoute />}
          {page === "ContentCreation" && <ContentCreation />}
          {page === "Adminpanel" && <AdminPanel />}
          {page === "Announcement" && <Announcement />}
          {page === "PlayerApprove" && <PlayerApprove />}
          {page === "PlayerRequests" && <PlayerRequests />}
          {page === "trialout" && <TrialOut />}
          {page === "BrandLogo" && <BrandLogo />}
          {page === "TransferNews" && <TransferNews />}
          {page === "ClubNewsDashboard" && <ClubNewsDashboard />}
          {page === "ManagerDash" && <ManagerDash />}
        </div>
      </div>
    </>
  );
};

export default withAuth(Dashboard, ["admin"]);
