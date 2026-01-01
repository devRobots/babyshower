import { Icon } from "@iconify/react";
import type { InfoItemProps } from '@/types/components';

export default function InfoItem(props: InfoItemProps) {
  const { icon, body, desc, className, children } = props;
  return (
    <article className={`info-item ${className}`}>
      {children ? children : null}
      <section>
        <Icon icon={icon} className="text-primary" width={32} />
        <div className="flex flex-col">
          <strong className="text-balance">{body}</strong>
          <small className="text-black/50">{desc}</small>
        </div>
      </section>
    </article>
  );
}