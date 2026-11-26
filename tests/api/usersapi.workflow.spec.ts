import {test, expect} from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = { AUTHORIZATION: `Bearer ${TOKEN}` };
let userId:number;

//post-get
//post-put
//post-delete

//helper function - create a new user

async function createUser(apiHelper:any) {
  const userData = {
    name: "Adit API Automation",
    email: `uday${Date.now()}@example.com`,
    gender: "male",
    status: "active"
  }
  let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(userData.name);
  console.log(response.body.id);
  return response.body;


};

//Test1: create a user test + verify
//POST --> userId --> Get --> /userId
test('POST - create a user', async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  //get the user
  let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(userResponse.id);
  expect(response.body.name).toBe(userResponse.name);
  
});

//Test2: update a user test + verify
//POST --> userId --> Get --> /userId
test('PUT - update a user', async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  //update the user
  const updatedUserData = {
    name: "Adit API Automation Updated",
    status: "inactive"
  };
  let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, updatedUserData, AUTH_HEADER);
  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.name).toBe(updatedUserData.name);
  expect(updateResponse.body.status).toBe(updatedUserData.status);

  //get the user
  const getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.id).toBe(userResponse.id);
  expect(getResponse.body.name).toBe(updatedUserData.name);
  expect(getResponse.body.status).toBe(updatedUserData.status);
});

//Test3: delete a user test + verify
test('DELETE - delete a user', async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  //delete the user
  let deleteResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(deleteResponse.status).toBe(204);

  //get the user to verify deletion
  let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe('Resource not found');
  
});
