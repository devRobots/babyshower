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

interface RSVPUpdateEmailProps {
  guestName: string;
  isAttending: boolean;
  previousStatus: boolean;
}

export default function RSVPUpdateEmail({
  guestName,
  isAttending,
  previousStatus,
}: RSVPUpdateEmailProps) {
  const firstName = guestName.split(' ')[0];
  const statusChanged = isAttending !== previousStatus;

  return (
    <Html>
      <Head />
      <Preview>Tu confirmación ha sido actualizada</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>✏️ Confirmación actualizada</Heading>

          <Text style={text}>Hola {firstName},</Text>

          <Text style={text}>
            Hemos actualizado tu confirmación de asistencia.
          </Text>

          {statusChanged && (
            <Section style={statusBox}>
              <Text style={statusText}>
                {isAttending
                  ? '✅ Ahora asistirás al baby shower'
                  : '❌ Has cambiado a no asistir'}
              </Text>
            </Section>
          )}

          {isAttending ? (
            <>
              <Text style={text}>
                ¡Nos alegra que puedas acompañarnos! Te esperamos con mucho cariño.
              </Text>
              <Section style={buttonContainer}>
                <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/gifts`}>
                  Seleccionar un regalo
                </Button>
              </Section>
            </>
          ) : (
            <Text style={text}>
              Lamentamos que no puedas estar con nosotros, pero te llevamos en el corazón.
            </Text>
          )}

          <Text style={footer}>
            Con cariño,
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

const statusBox = {
  backgroundColor: '#efd4db',
  borderRadius: '16px',
  border: '2px solid #d55873',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const statusText = {
  color: '#d55873',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
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

const footer = {
  color: '#999999',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '40px',
  textAlign: 'center' as const,
};
