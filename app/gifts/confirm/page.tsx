import Link from 'next/link';

export default function GiftConfirmationPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 md:px-16 lg:px-64">
      <div className="max-w-lg mx-auto">
        <div className="relative w-full bg-white border-4 border-secondary rounded-4xl shadow-lg p-8 md:p-12 overflow-hidden">
          
          <div className="absolute -bottom-8 -right-8 text-9xl opacity-20 pointer-events-none">
            🎁
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">

            <div className="text-6xl">
              ✨
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-black/80">
              ¡Regalo reservado!
            </h1>

            <div className="text-black/60 space-y-3 max-w-md">
              <p>
                Tu selección ha sido registrada con éxito.
              </p>
              <p>
                Muchas gracias por tu generosidad. Tu regalo será muy especial
                para nuestro bebé y nuestra familia.
              </p>
              <p className="font-medium text-primary">
                ¡Te lo agradecemos de corazón! 💝
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-xs">
              <Link
                href="/"
                className="button-primary text-center text-white w-full"
              >
                Volver al inicio
              </Link>

              <Link
                href="/#gifts"
                className="text-sm text-black/50 hover:text-primary transition-colors"
              >
                Ver lista de regalos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
