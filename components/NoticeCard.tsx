import Link from 'next/link';
import type { NoticeCardProps } from '@/types/components';

export default function NoticeCard({
  title,
  message,
  additionalMessage,
  actionButtonText,
  actionButtonHref,
}: NoticeCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="notice-card">
        <h3>{title}</h3>
        <p>{message}</p>
        {additionalMessage && (
          <div className="text-xs mt-2">{additionalMessage}</div>
        )}
        <Link href={actionButtonHref} className="button-primary text-white text-center mt-2">
          {actionButtonText}
        </Link>
      </div>
      <Link
        href="/"
        className="text-sm text-black/50 hover:text-primary transition-colors"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
