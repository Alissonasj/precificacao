import orchestrator from '../../../orchestrator';

beforeAll(async () => {
  await orchestrator.truncateTable('materials');
  await orchestrator.runDrizzleKitPush();
});

test('POST /api/v1/materials', async () => {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      materialName: 'Prada',
      materialGroup: 'Sintético',
      price: 31
    })
  });

  const responseBody = await response.json();

  expect(response.status).toBe(201);
  expect(Array.isArray(responseBody)).toBe(true);
});
