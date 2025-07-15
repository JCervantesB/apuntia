"use client";

import React from "react";
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
        className="text-red-500 text-xs hover:underline"
      >
        Eliminar
      </button>
    </form>
  );
}
