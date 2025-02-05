"use client";
import Announcement from "@/app/component/comp_dashboard/Announcement";
import AdminPanel from "@/app/component/comp_dashboard/Authemails";
import BrandLogo from "@/app/component/comp_dashboard/BrandLogo/BrandLogo";
import ClubNewsDashboard from "@/app/component/comp_dashboard/ClubNews/ClubNew";
import ContentCreation from "@/app/component/comp_dashboard/ContentCreation";
import SidebarDash from "@/app/component/comp_dashboard/Dashsidebar";
import Explorefilter from "@/app/component/comp_dashboard/Explorefilter";
import ManagerDash from "@/app/component/comp_dashboard/Manager/ManagerDash";
import Overview from "@/app/component/comp_dashboard/Overview";
import PlayerApprove from "@/app/component/comp_dashboard/PlayerApprove/PlayerApprove";
import PlayerManager from "@/app/component/comp_dashboard/PlayerManager";
import PlayerRequests from "@/app/component/comp_dashboard/PlayerRequests/PlayerRequests";
import RequestScoute from "@/app/component/comp_dashboard/RequestScoute";
import TransferNews from "@/app/component/comp_dashboard/TransferPlayers/TransferNews";
import TrialOut from "@/app/component/comp_dashboard/Trial_out/Trial_out";
import { withAuth } from "@/lib/protected";
import React, { useState } from "react";

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
