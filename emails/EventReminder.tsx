import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Button,
} from '@react-email/components';

interface EventReminderEmailProps {
  guestName: string;
  daysUntilEvent: number;
  hasGift: boolean;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export default function EventReminderEmail({
  guestName,
  daysUntilEvent,
  hasGift,
  eventDate,
  eventTime,
  eventLocation,
}: EventReminderEmailProps) {
  const firstName = guestName.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>
        {hasGift
          ? `¡Faltan ${daysUntilEvent} días para el baby shower!`
          : `¡Recordatorio! Aún puedes seleccionar un regalo`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {hasGift
              ? '⏰ ¡Ya casi es el día!'
              : '🎁 Recordatorio'}
          </Heading>

          <Text style={text}>Hola {firstName},</Text>

          {hasGift ? (
            <>
              <Section style={countdownBox}>
                <Text style={countdownNumber}>{daysUntilEvent}</Text>
                <Text style={countdownText}>
                  {daysUntilEvent === 1 ? 'día' : 'días'} para el baby shower
                </Text>
              </Section>

              <Text style={text}>
                ¡Estamos muy emocionados de verte pronto! Te recordamos los detalles del evento:
              </Text>
            </>
          ) : (
            <>
              <Text style={text}>
                Notamos que confirmaste tu asistencia pero aún no has seleccionado un regalo.
              </Text>

              <Text style={text}>
                ¡No te preocupes! Todavía estás a tiempo. Faltan {daysUntilEvent} días para el evento.
              </Text>

              <Section style={buttonContainer}>
                <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/gifts`}>
                  Seleccionar un regalo
                </Button>
              </Section>
            </>
          )}

          <Section style={eventDetails}>
            <Text style={detailLabel}>📅 Fecha:</Text>
            <Text style={detailValue}>{eventDate}</Text>

            <Text style={detailLabel}>🕐 Hora:</Text>
            <Text style={detailValue}>{eventTime}</Text>

            <Text style={detailLabel}>📍 Lugar:</Text>
            <Text style={detailValue}>{eventLocation}</Text>
          </Section>

          <Text style={text}>
            ¡Te esperamos con mucho cariño!
          </Text>

          <Text style={footer}>
            Con amor,
            <br />
            Los futuros papás 👶
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f8f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '48px 32px',
  marginBottom: '32px',
  borderRadius: '24px',
  maxWidth: '600px',
  border: '4px solid #efd4db',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#d55873',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const text = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const countdownBox = {
  backgroundColor: '#efd4db',
  borderRadius: '20px',
  border: '2px solid #d55873',
  padding: '40px',
  margin: '32px 0',
  textAlign: 'center' as const,
};

const countdownNumber = {
  color: '#d55873',
  fontSize: '72px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1',
};

const countdownText = {
  color: '#d55873',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '12px 0 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d55873',
  borderRadius: '9999px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 36px',
};

const eventDetails = {
  backgroundColor: '#f8f6f6',
  borderRadius: '16px',
  border: '2px solid #efd4db',
  padding: '28px',
  margin: '24px 0',
};

const detailLabel = {
  color: '#999999',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '12px 0 4px',
  letterSpacing: '0.5px',
};

const detailValue = {
  color: '#333333',
  fontSize: '16px',
  margin: '0 0 8px',
};

const footer = {
  color: '#999999',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '40px',
  textAlign: 'center' as const,
};
