"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRSVP } from '@/actions/rsvp';
import type { GuestFormProps } from '@/types/components';

export default function GuestForm({ initialData }: GuestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const isAttending = formData.get('attending') === 'yes';
    const message = formData.get('message') as string;

    const result = await submitRSVP(name, email, isAttending, message);

    setLoading(false);

    if (result.success) {
      router.push('/rsvp/confirm');
    } else {
      setError(result.error || 'Error al enviar confirmación');
    }
  };

  return (
    <form className="guest-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ej: María García"
          defaultValue={initialData?.name || ''}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="correo@ejemplo.com"
          defaultValue={initialData?.email || ''}
          required
          readOnly={!!initialData}
          className={initialData ? 'bg-gray-100 cursor-not-allowed' : ''}
        />
        {initialData && (
          <p className="text-xs text-black/50 mt-1">
            El correo no se puede modificar
          </p>
        )}
      </div>

      <fieldset className="form-field">
        <legend className="form-label">
          ¿Asistirás al evento?
        </legend>

        <div className="radio-group">
          <label htmlFor="attending_yes" className="radio-option">
            <input
              type="radio"
              id="attending_yes"
              name="attending"
              value="yes"
              defaultChecked={initialData?.isAttending === true}
              required
            />
            <span>Sí, asistiré</span>
          </label>

          <label htmlFor="attending_no" className="radio-option">
            <input
              type="radio"
              id="attending_no"
              name="attending"
              value="no"
              defaultChecked={initialData?.isAttending === false}
              required
            />
            <span>No podré asistir</span>
          </label>
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="message" className="form-label">
          Mensaje adicional
          <span className="text-xs text-black/40 ml-2">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Comparte tus buenos deseos, menciona invitados adicionales, o cualquier mensaje especial..."
          defaultValue={initialData?.message || ''}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="button-primary w-full disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Guardando...' : (initialData ? 'Actualizar Confirmación' : 'Enviar Confirmación')}
      </button>
    </form>
  );
}