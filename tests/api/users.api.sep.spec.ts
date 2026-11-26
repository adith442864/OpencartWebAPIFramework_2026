import {test, expect} from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = { AUTHORIZATION: `Bearer ${TOKEN}` };
let userId:number;

test.describe.serial('running e2e go rest crud api tests', () => {

//GET API Test:
test('GET Allusers', async ({ apiHelper }) => {
    const response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});


//POST API Test:
test('POST API - Create a user', async ({ apiHelper }) => {
  const userData = {
    name: "Adit API Automation",
    // email: await randomEmail(),
    email: `uday${Date.now()}@example.com`,
    gender: "male",
    status: "active"
  }  
    const response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId=response.body.id;
    console.log('Created User Id: ' , userId);
    expect(userId).toBeDefined();

  
});

//PUT API Test:
test('PUT API - Update users', async ({ apiHelper }) => {
  const updatedUserData = {
      name: "Adit API Automation Updated",
      status: "inactive"
    }

    const response = await apiHelper.put(`/public/v2/users/${userId}`, updatedUserData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body.status).toBe(updatedUserData.status);

  
})

//4. delete 
test('DELETE API - Delete user', async ({ apiHelper }) => {
    const response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);
});

});