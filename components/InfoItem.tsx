import { Icon } from "@iconify/react";

interface InfoItemProps {
  icon: string;
  body: string;
  desc: string;
  className?: string;
  children?: React.ReactNode;
}

export default function InfoItem(props: InfoItemProps) {
  const { icon, body, desc, className, children } = props;
  return (
    <article className={`flex flex-col border bg-white border-[#efd4db] rounded-3xl justify-center p-4 gap-2 ${className ? className : ""}`}>
      {children ? children : null}
      <section className="flex flex-row gap-4 items-center">
        <Icon icon={icon} color="#d55873" width={32} />
        <div className="flex flex-col">
          <strong className="text-balance">{body}</strong>
          <small className="text-black/50">{desc}</small>
        </div>
      </section>
    </article>
  );
}