export interface ResponseCardProps {
  children?: React.ReactNode;
}

export default function ResponseCard(props: ResponseCardProps) {
  const { children } = props;
  return (
    <article className="response-card">
      <div className="watermark">
        <span className="watermark-emoji">🕊️</span>
      </div>
      <div className="card-content">
        {children}
      </div>
    </article>
  );
}