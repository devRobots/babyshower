export interface Gift {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  link: string | null;
  price: number | null;
  stock: number;
  priority: number;
  _count: {
    reservations: number;
  };
}

export interface GiftItemProps {
  name: string;
  description: string;
  image: string;
  price: number;
  link: string;
}

export interface GiftCardProps {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  isReserved: boolean;
  stock?: number;
  availableCount?: number;
  onClick: () => void;
}

export interface GiftDetailModalProps {
  gift: Gift | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export interface GiftGridProps {
  gifts: Gift[];
  hasSession: boolean;
  isAttending: boolean;
}
