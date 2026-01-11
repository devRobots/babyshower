import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from '@react-email/components';

interface ParentsNotificationEmailProps {
  type: 'rsvp' | 'rsvp-update' | 'gift-selection' | 'gift-change';
  guestName: string;
  guestEmail: string;
  isAttending?: boolean;
  previousStatus?: boolean;
  giftName?: string;
  message?: string | null;
}

export default function ParentsNotificationEmail({
  type,
  guestName,
  guestEmail,
  isAttending,
  previousStatus,
  giftName,
  message,
}: ParentsNotificationEmailProps) {
  const getTitle = () => {
    switch (type) {
      case 'rsvp':
        return isAttending ? '✅ Nueva confirmación de asistencia' : '❌ Confirmación de no asistencia';
      case 'rsvp-update':
        return '✏️ Actualización de confirmación';
      case 'gift-selection':
        return '🎁 Regalo seleccionado';
      case 'gift-change':
        return '🔄 Regalo modificado';
      default:
        return 'Notificación';
    }
  };

  return (
    <Html>
      <Head />
      <Preview>{getTitle()}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{getTitle()}</Heading>

          <Section style={infoBox}>
            <Text style={label}>Invitado:</Text>
            <Text style={value}>{guestName}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{guestEmail}</Text>

            {type === 'rsvp' || type === 'rsvp-update' ? (
              <>
                <Text style={label}>Asistencia:</Text>
                <Text style={value}>{isAttending ? 'Sí asistirá ✅' : 'No asistirá ❌'}</Text>

                {type === 'rsvp-update' && previousStatus !== undefined && (
                  <>
                    <Text style={label}>Estado anterior:</Text>
                    <Text style={value}>{previousStatus ? 'Asistía' : 'No asistía'}</Text>
                  </>
                )}

                {message && (
                  <>
                    <Hr style={separator} />
                    <Text style={label}>Mensaje del invitado:</Text>
                    <Text style={messageText}>{message}</Text>
                  </>
                )}
              </>
            ) : (
              <>
                <Text style={label}>Regalo seleccionado:</Text>
                <Text style={value}>{giftName}</Text>
              </>
            )}
          </Section>

          <Text style={footer}>
            Baby Shower Management System 👶
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
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const infoBox = {
  backgroundColor: '#f8f6f6',
  borderRadius: '16px',
  border: '2px solid #efd4db',
  padding: '28px',
  margin: '24px 0',
};

const label = {
  color: '#999999',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '16px 0 4px',
  letterSpacing: '0.5px',
};

const value = {
  color: '#333333',
  fontSize: '16px',
  margin: '0 0 8px',
};

const separator = {
  borderColor: '#efd4db',
  margin: '20px 0',
};

const messageText = {
  color: '#666666',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #efd4db',
};

const footer = {
  color: '#999999',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '40px',
};
