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
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800">
      <h2 className="text-2xl font-semibold mb-5">Apuntes de investigación</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full bg-white text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Título</th>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Fecha creación</th>
              <th className="py-3 px-6 text-center uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {summaries.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500 italic">
                  No hay apuntes guardados.
                </td>
              </tr>
            )}
            {summaries.map((s) => (
              <tr
                key={s.id}
                className="border-b border-gray-200 hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-6">
                  <Link href={`/summaries/${s.id}`} className="block hover:underline">
                    {s.title}
                  </Link>
                </td>
                <td className="py-3 px-6">{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <DeleteButton id={s.id} type="apunte" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-5">PDF Resúmenes</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full bg-white text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Título</th>
              <th className="py-3 px-6 text-left uppercase tracking-wide">Fecha creación</th>
              <th className="py-3 px-6 text-center uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pdfSummaries.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500 italic">
                  No hay resúmenes PDF guardados.
                </td>
              </tr>
            )}
            {pdfSummaries.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-200 hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-6">
                  <Link href={`/pdfsummaries/${p.id}`} className="block hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="py-3 px-6">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <DeleteButton id={p.id} type="pdf" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
