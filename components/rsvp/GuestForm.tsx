"use client";

export default function GuestForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de envío del formulario
    console.log("Formulario enviado");
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
          required
        />
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
        />
      </div>

      <button type="submit" className="button-primary w-full">
        Enviar Confirmación
      </button>
    </form>
  );
}