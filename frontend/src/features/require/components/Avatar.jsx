import React, { useState } from "react";
import {
  Folder,
  FileText,
  Search,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Compass,
  FileCheck,
  Video,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/base-ui/Button";
import { Input } from "@/components/base-ui/Input";
import { Modal } from "@/components/base-ui/Modal";
import { authService } from "@/features/auth/services";
import { useAuthStore } from "@/features/auth/store";
import { useWorkspaceStore } from "@/features/folders/store";
import { folderService } from "@/features/folders/services";

export default function Avatar() {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    authService.logout();
  };

  return (
    <div>
      <div onClick={() => setShowLogout(!showLogout)}>
        <img src="#" alt="Avatar" />
      </div>

      {showLogout && (
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
}
