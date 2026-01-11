import { redirect } from 'next/navigation';
import { getAdminData } from '@/actions/admin';
import { getConfig } from '@/lib/config';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const secret = params.secret;

  // Verificar autenticación
  if (secret !== process.env.CRON_SECRET) {
    redirect('/');
  }

  const config = getConfig();
  const data = await getAdminData();

  // Separar invitados que asisten y no asisten
  const attendingGuests = data.guests.filter((g) => g.isAttending);
  const notAttendingGuests = data.guests.filter((g) => !g.isAttending);

  // Regalos seleccionados (con reservas)
  const selectedGifts = data.gifts
    .filter((g) => g.reservations.length > 0)
    .map((gift) => ({
      gift,
      reservations: gift.reservations,
    }));

  // Regalos pendientes (sin reservas o con stock disponible)
  const pendingGifts = data.gifts.filter((g) => {
    const reservedCount = g.reservations.length;
    return reservedCount < g.stock;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-2 text-sm text-gray-600">
            Baby Shower - {config.baby.name}
          </p>
        </div>

        {/* Sección 1: Configuración Visual */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuración del Evento</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Información del Bebé */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Bebé</h3>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Nombre:</span> {config.baby.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Género:</span> {config.baby.gender}
                </p>
              </div>
            </div>

            {/* Información de los Padres */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Padres</h3>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Mamá:</span> {config.parents.mom}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Papá:</span> {config.parents.dad}
                </p>
              </div>
            </div>

            {/* Información del Evento */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Evento</h3>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Fecha:</span> {config.event.date}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Hora:</span> {config.event.time}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {config.event.location.address}
                </p>
              </div>
            </div>

            {/* Recordatorios */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Recordatorios</h3>
              <div className="flex flex-wrap gap-2">
                {config.reminders.days.map((day) => (
                  <span
                    key={day}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {day} {day === 1 ? 'día' : 'días'} antes
                  </span>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">SEO</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Título:</span> {config.seo.title}
                </p>
                <p className="text-sm text-gray-600">
                  {config.seo.description}
                </p>
                <a
                  href={config.seo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {config.seo.url}
                </a>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Estadísticas</h3>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Invitados:</span> {data.stats.totalGuests}
                </p>
                <p className="text-sm text-green-600">
                  ✓ Asisten: {data.stats.attendingGuests}
                </p>
                <p className="text-sm text-red-600">
                  ✗ No asisten: {data.stats.notAttendingGuests}
                </p>
                <p className="text-lg mt-3">
                  <span className="font-semibold">Regalos:</span> {data.stats.totalGifts}
                </p>
                <p className="text-sm text-blue-600">
                  Reservados: {data.stats.reservedGifts}
                </p>
                <p className="text-sm text-gray-600">
                  Disponibles: {data.stats.availableGifts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Lista de Invitados y Respuestas */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Invitados y Respuestas ({data.stats.totalGuests} total)
          </h2>

          {/* Invitados que asisten */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-green-700 mb-4">
              ✓ Asisten ({data.stats.attendingGuests})
            </h3>
            <div className="overflow-x-auto">
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
                      Mensaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regalo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendingGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {guest.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {guest.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {guest.message || '-'}
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
          </div>

          {/* Invitados que no asisten */}
          <div>
            <h3 className="text-lg font-medium text-red-700 mb-4">
              ✗ No Asisten ({data.stats.notAttendingGuests})
            </h3>
            <div className="overflow-x-auto">
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
                      Mensaje
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notAttendingGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {guest.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {guest.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {guest.message || '-'}
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
          </div>
        </div>

        {/* Sección 3: Regalos Seleccionados */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Regalos Seleccionados ({data.stats.reservedGifts})
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Regalo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
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
                {selectedGifts.map(({ gift, reservations }) => (
                  <tr key={gift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {gift.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {gift.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        {reservations.map((reservation) => (
                          <div key={reservation.id}>
                            <span className="font-medium">{reservation.guest.name}</span>
                            <span className="text-gray-500 text-xs ml-2">
                              ({reservation.guest.email})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className={reservations.length >= gift.stock ? 'text-red-600 font-medium' : ''}>
                        {reservations.length} / {gift.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {reservations.map((reservation) => (
                        <div key={reservation.id} className="text-xs">
                          {format(new Date(reservation.createdAt), "d 'de' MMMM, yyyy", {
                            locale: es,
                          })}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedGifts.length === 0 && (
              <p className="text-center py-8 text-gray-500">
                No hay regalos seleccionados todavía
              </p>
            )}
          </div>
        </div>

        {/* Sección 4: Regalos Pendientes */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Regalos Pendientes ({data.stats.availableGifts})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingGifts.map((gift) => {
              const reservedCount = gift.reservations.length;
              const availableCount = gift.stock - reservedCount;

              return (
                <div
                  key={gift.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {gift.image && (
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{gift.name}</h3>
                  {gift.description && (
                    <p className="text-sm text-gray-600 mb-3">{gift.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Disponible: {availableCount} / {gift.stock}
                    </span>
                    {gift.link && (
                      <a
                        href={gift.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Ver enlace
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {pendingGifts.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              ¡Todos los regalos han sido seleccionados!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
