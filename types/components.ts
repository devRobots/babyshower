import { ReactNode } from 'react';

export interface GiftCarouselProps {
  children: ReactNode;
}

export interface NoticeCardProps {
  title: string;
  message: string;
  additionalMessage?: ReactNode;
  actionButtonText: string;
  actionButtonHref: string;
}

export interface ConfirmationCardProps {
  guest: {
    id: string;
    name: string;
    email: string;
    isAttending: boolean;
    message: string | null;
  };
}

export interface GuestFormProps {
  initialData?: {
    name: string;
    email: string;
    isAttending: boolean;
    message: string | null;
  } | null;
}

export interface InfoItemProps {
  icon: string;
  body: string;
  desc: string;
  className?: string;
  children?: ReactNode;
}
