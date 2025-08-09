import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import DeleteButton from "../delete-button";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <p>No estás autenticado</p>;
  }

  const summaries = await prismadb.summary.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const pdfSummaries = await prismadb.pdfSummary.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-white">
      {/* APUNTES */}
      <h2 className="md:text-xl font-semibold mb-5 text-white">Apuntes de investigación</h2>

      {/* Tabla - Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-2xl border border-purple-300/30 mb-8 bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl ring-1 ring-purple-400/20">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white backdrop-blur-sm">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Título</th>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Fecha creación</th>
              <th className="py-3 px-6 text-center uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {summaries.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-white/70 italic">
                  No hay apuntes guardados.
                </td>
              </tr>
            )}
            {summaries.map((s) => (
              <tr
                key={s.id}
                className="border-b border-purple-300/20 hover:bg-purple-500/20 transition-colors cursor-pointer"
              >
                <td className="py-3 px-6">
                  <Link href={`/summaries/${s.id}`} className="block hover:underline text-white hover:text-purple-300 transition-colors">
                    {s.title}
                  </Link>
                </td>
                <td className="py-3 px-6 text-white/80 text-right">{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <DeleteButton id={s.id} type="apunte" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="sm:hidden flex flex-col gap-2 mb-8">
        {summaries.map((s) => (
          <div
            key={s.id}
            className="border border-purple-300/30 p-3 rounded-xl bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl text-xs flex flex-col gap-2 ring-1 ring-purple-400/20"
          >
            <Link
              href={`/summaries/${s.id}`}
              className="font-medium hover:underline line-clamp-2 leading-tight text-white hover:text-purple-300 transition-colors"
            >
              {s.title}
            </Link>
            <div className="flex justify-between items-center text-[10px] text-white/70">
              <span>{new Date(s.createdAt).toLocaleDateString()}</span>
              <DeleteButton id={s.id} type="apunte" />
            </div>
          </div>
        ))}
      </div>

      {/* PDF RESÚMENES */}
      <h2 className="md:text-xl font-semibold mt-12 mb-5 text-white">PDF Resúmenes</h2>

      {/* Tabla - Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-2xl border border-purple-300/30 bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl ring-1 ring-purple-400/20">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white backdrop-blur-sm">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Título</th>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Fecha creación</th>
              <th className="py-3 px-6 text-center uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pdfSummaries.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-white/70 italic">
                  No hay resúmenes PDF guardados.
                </td>
              </tr>
            )}
            {pdfSummaries.map((p) => (
              <tr
                key={p.id}
                className="border-b border-purple-300/20 hover:bg-purple-500/20 transition-colors cursor-pointer"
              >
                <td className="py-3 px-6">
                  <Link href={`/pdfsummaries/${p.id}`} className="block hover:underline text-white hover:text-purple-300 transition-colors">
                    {p.title}
                  </Link>
                </td>
                <td className="py-3 px-6 text-white/80 text-right">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <DeleteButton id={p.id} type="pdf" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="sm:hidden flex flex-col gap-2">
        {pdfSummaries.map((p) => (
          <div
            key={p.id}
            className="border border-purple-300/30 p-3 rounded-xl bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl text-xs flex flex-col gap-2 ring-1 ring-purple-400/20"
          >
            <Link
              href={`/pdfsummaries/${p.id}`}
              className="font-medium hover:underline line-clamp-2 leading-tight text-white hover:text-purple-300 transition-colors"
            >
              {p.title}
            </Link>
            <div className="flex justify-between items-center text-[10px] text-white/70">
              <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              <DeleteButton id={p.id} type="pdf" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
