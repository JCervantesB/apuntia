"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { deleteSummaryAction } from "@/app/actions/delete-summary";

interface DeleteButtonProps {
  id: string;
  type: "apunte" | "pdf";
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  return (
    <form action={deleteSummaryAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="type" value={type} />
      <button
        type="submit"
        className="group flex items-center justify-center p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all duration-200 hover:scale-105"
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
      </button>
    </form>
  );
}
