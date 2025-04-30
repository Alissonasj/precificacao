import orchestrator from '../../../orchestrator';

beforeAll(async () => {
  await orchestrator.runDrizzleKitPush();
});

test('GET /api/v1/materials', async () => {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
});
