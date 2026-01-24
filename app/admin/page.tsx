"use client";

import { useState, useEffect } from "react";
import { getAdminData } from "@/actions/admin";
import { getConfig } from "@/lib/config";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AdminGiftManagement from "@/components/admin/AdminGiftManagement";

interface PageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default function AdminPage({ searchParams }: PageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [params, setParams] = useState<{ secret?: string }>({});

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await searchParams;
      setParams(resolvedParams);

      // Verificar autenticación por URL primero
      if (resolvedParams.secret === process.env.NEXT_PUBLIC_CRON_SECRET) {
        setIsAuthenticated(true);
        loadData();
      }
    };

    loadParams();
  }, [searchParams]);

  const loadData = async () => {
    try {
      const [configData, adminData] = await Promise.all([
        getConfig(),
        getAdminData(),
      ]);
      setConfig(configData);
      setData(adminData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      loadData();
    } else {
      setError("Contraseña incorrecta");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Panel de Administración
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ingresa la contraseña para acceder
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!config || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Separar invitados que asisten y no asisten
  const attendingGuests = data.guests.filter((g: any) => g.isAttending);
  const notAttendingGuests = data.guests.filter((g: any) => !g.isAttending);

  // Regalos seleccionados (con reservas)
  const selectedGifts = data.gifts
    .filter((g: any) => g.reservations.length > 0)
    .map((gift: any) => ({
      gift,
      reservations: gift.reservations,
    }));

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Panel de Administración
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Baby Shower - {config.baby.name}
          </p>
        </div>

        {/* Sección 1: Configuración Visual */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-8 p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Configuración del Evento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Información del Bebé */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                Bebé
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Nombre:</span>{" "}
                  {config.baby.name}
                </p>
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Género:</span>{" "}
                  {config.baby.gender}
                </p>
              </div>
            </div>

            {/* Información de los Padres */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                Padres
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Mamá:</span>{" "}
                  {config.parents.mom}
                </p>
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Papá:</span>{" "}
                  {config.parents.dad}
                </p>
              </div>
            </div>

            {/* Información del Evento */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                Evento
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {config.event.date}
                </p>
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Hora:</span>{" "}
                  {config.event.time}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                  {config.event.location.address}
                </p>
              </div>
            </div>

            {/* Recordatorios */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                Recordatorios
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {config.reminders.days.map((day: any) => (
                  <span
                    key={day}
                    className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {day} {day === 1 ? "día" : "días"} antes
                  </span>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                SEO
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Título:</span>{" "}
                  {config.seo.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  {config.seo.description}
                </p>
                <a
                  href={config.seo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 hover:underline break-all block"
                >
                  {config.seo.url}
                </a>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                Estadísticas
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold">Invitados:</span>{" "}
                  {data.stats.totalGuests}
                </p>
                <p className="text-xs sm:text-sm text-green-600">
                  ✓ Asisten: {data.stats.attendingGuests}
                </p>
                <p className="text-xs sm:text-sm text-red-600">
                  ✗ No asisten: {data.stats.notAttendingGuests}
                </p>
                <p className="text-sm sm:text-lg mt-2 sm:mt-3">
                  <span className="font-semibold">Regalos:</span>{" "}
                  {data.stats.totalGifts}
                </p>
                <p className="text-xs sm:text-sm text-blue-600">
                  Reservados: {data.stats.reservedGifts}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Disponibles: {data.stats.availableGifts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Lista de Invitados y Respuestas */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-8 p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Invitados y Respuestas ({data.stats.totalGuests} total)
          </h2>

          {/* Invitados que asisten */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-medium text-green-700 mb-3 sm:mb-4">
              ✓ Asisten ({data.stats.attendingGuests})
            </h3>
            {/* Vista de tabla para desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regalo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendingGuests.map((guest: any) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {guest.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {guest.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {guest.reservation ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {guest.reservation.gift.name}
                          </span>
                        ) : (
                          <span className="text-gray-400">Sin regalo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {attendingGuests.length === 0 && (
                <p className="text-center py-8 text-gray-500">
                  No hay invitados que hayan confirmado asistencia
                </p>
              )}
            </div>
            {/* Vista de cards para móvil */}
            <div className="md:hidden space-y-3">
              {attendingGuests.map((guest: any) => (
                <div
                  key={guest.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="font-medium text-gray-900 mb-1 text-sm">
                    {guest.name}
                  </div>
                  <div className="text-xs text-gray-600 mb-2 break-all">
                    {guest.email}
                  </div>
                  {guest.reservation ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {guest.reservation.gift.name}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Sin regalo</span>
                  )}
                </div>
              ))}
              {attendingGuests.length === 0 && (
                <p className="text-center py-6 text-sm text-gray-500">
                  No hay invitados que hayan confirmado asistencia
                </p>
              )}
            </div>
          </div>

          {/* Invitados que no asisten */}
          <div>
            <h3 className="text-base sm:text-lg font-medium text-red-700 mb-3 sm:mb-4">
              ✗ No Asisten ({data.stats.notAttendingGuests})
            </h3>
            {/* Vista de tabla para desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regalo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notAttendingGuests.map((guest: any) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {guest.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {guest.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {guest.reservation?.gift?.name || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {notAttendingGuests.length === 0 && (
                <p className="text-center py-8 text-gray-500">
                  No hay invitados que hayan declinado la invitación
                </p>
              )}
            </div>
            {/* Vista de cards para móvil */}
            <div className="md:hidden space-y-3">
              {notAttendingGuests.map((guest: any) => (
                <div
                  key={guest.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="font-medium text-gray-900 mb-1 text-sm">
                    {guest.name}
                  </div>
                  <div className="text-xs text-gray-600 mb-2 break-all">
                    {guest.email}
                  </div>
                </div>
              ))}
              {notAttendingGuests.length === 0 && (
                <p className="text-center py-6 text-sm text-gray-500">
                  No hay invitados que hayan declinado la invitación
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección 3: Regalos Seleccionados */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-8 p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Regalos Seleccionados ({data.stats.reservedGifts})
          </h2>
          {/* Vista de tabla para desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Regalo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invitado(s)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Reserva
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedGifts.map(
                  ({
                    gift,
                    reservations,
                  }: {
                    gift: any;
                    reservations: any[];
                  }) => (
                    <tr key={gift.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {gift.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {reservations.map((reservation: any) => (
                            <div key={reservation.id}>
                              <span className="font-medium">
                                {reservation.guest.name}
                              </span>
                              <br />
                              <span className="text-gray-500 text-xs">
                                {reservation.guest.email}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span
                          className={
                            reservations.length >= gift.stock
                              ? "text-red-600 font-medium"
                              : ""
                          }
                        >
                          {reservations.length} / {gift.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {reservations.map((reservation: any) => (
                          <div key={reservation.id} className="text-xs">
                            {format(
                              new Date(reservation.createdAt),
                              "d 'de' MMMM, yyyy",
                              {
                                locale: es,
                              },
                            )}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
            {selectedGifts.length === 0 && (
              <p className="text-center py-8 text-gray-500">
                No hay regalos seleccionados todavía
              </p>
            )}
          </div>
          {/* Vista de cards para móvil */}
          <div className="md:hidden space-y-3">
            {selectedGifts.map(
              ({ gift, reservations }: { gift: any; reservations: any[] }) => (
                <div
                  key={gift.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="font-medium text-gray-900 mb-2 text-sm">
                    {gift.name}
                  </div>
                  <div className="mb-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Reservado por:
                    </div>
                    {reservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="text-xs text-gray-900 mb-1"
                      >
                        <span className="font-medium">
                          {reservation.guest.name}
                        </span>
                        <div className="text-gray-500 break-all">
                          {reservation.guest.email}
                        </div>
                        <div className="text-gray-500">
                          {format(
                            new Date(reservation.createdAt),
                            "d 'de' MMMM, yyyy",
                            {
                              locale: es,
                            },
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Stock: </span>
                    <span
                      className={
                        reservations.length >= gift.stock
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {reservations.length} / {gift.stock}
                    </span>
                  </div>
                </div>
              ),
            )}
            {selectedGifts.length === 0 && (
              <p className="text-center py-6 text-sm text-gray-500">
                No hay regalos seleccionados todavía
              </p>
            )}
          </div>
        </div>

        {/* Sección 4: Gestión de Regalos (Admin) */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-8 p-3 sm:p-6">
          <AdminGiftManagement gifts={data.gifts} guests={data.guests} />
        </div>
      </div>
    </div>
  );
}
