import PartifulApi from '../index';

describe('test Partiful API Endpoints', () => {
  const AUTH_TOKEN =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMDNhZTdmNDczZjJjNmIyNTI3NmMwNjM2MGViOTk4ODdlMjNhYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSXZhbiBQb3JvbGxvIiwicGljdHVyZSI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvZ2V0cGFydGlmdWwuYXBwc3BvdC5jb20vby91c2VyJTJGNW5LWlNIV3djTllWcmFzQmh3bG50bFVPMnVYMiUyRnByb2ZpbGVJbWFnZXMlMkZ3aklrSXJQS3dRdXozLWI3eWhFTlA_YWx0PW1lZGlhJnRva2VuPWY4YzhmNDAzLTAxNjItNGEzMi1iN2U3LWM3ZDFhODcyOTM0NSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9nZXRwYXJ0aWZ1bCIsImF1ZCI6ImdldHBhcnRpZnVsIiwiYXV0aF90aW1lIjoxNjg2MzYxMjYwLCJ1c2VyX2lkIjoiNW5LWlNIV3djTllWcmFzQmh3bG50bFVPMnVYMiIsInN1YiI6IjVuS1pTSFd3Y05ZVnJhc0Jod2xudGxVTzJ1WDIiLCJpYXQiOjE2ODc1OTI3NjAsImV4cCI6MTY4NzU5NjM2MCwicGhvbmVfbnVtYmVyIjoiKzE1MTMyMjY3MTEyIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTUxMzIyNjcxMTIiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.Cyw1vqNZY8QrNMa92oBVAfN-r20H0-hoNR8CaF8aPIqvLavjbDfG1tBDgxpXiN-m_9U6vKUtqKGq-lDEKtzmzIIp-RImmtn9iG7Cz5AIMBC_LL9uOxdzTNStV1AC0-Ghgpy7lKTpqMAPVogDh9hi7j1IuiVVsIx7DqEUgmA91mrpEUh8x7mUUyoQiwForYcjqTGPMHqU4jMpLaSLArjx46fmDWP4Ux-lkOIq5jbKIcubLpxovyyNHX_7c1QM0BZLMgreWLNVgsyw-yei_WYOjC6XwjbpJpPBm4I8jyeTTI1CTACs4L8IgcvF7zCTGp-wNReSre3cXH8CM-LCy02lmQ';
  const USER_ID = 'z3Wi0Z7wPNYznzNdFXWD59w6atO2';
  const EVENT_ID = 'ONlRN7FzYo7wySk2VoUG';

  const partiful = new PartifulApi(AUTH_TOKEN);

  test('getMutuals', async () => {
    const result = await partiful.getMutuals();
    // TODO: need better test
    expect(result).toBeInstanceOf(Object);
  });

  test('getUsers', async () => {
    const result = await partiful.getUsers([USER_ID]);
    // TODO: need better test
    expect(result).toBeInstanceOf(Object);
  });

  test('getInvitableContacts', async () => {
    const result = await partiful.getInvitableContacts(EVENT_ID);
    expect(result).toBeInstanceOf(Object);
  });

  test('getGuestsCsv', async () => {
    const result = await partiful.getGuestsCsv(EVENT_ID);
    expect(result.length).toBeGreaterThan(0);
  });

  test('getEvent', async () => {
    const result = await partiful.getEvent(EVENT_ID);
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        id: 'ONlRN7FzYo7wySk2VoUG',
        name: 'AI Builders Co-Working at Precursor Ventures',
        startDateTime: '2023-06-21T04:30:00.000Z',
        url: 'https://partiful.com/e/ONlRN7FzYo7wySk2VoUG',
      }),
    );
  });
});
