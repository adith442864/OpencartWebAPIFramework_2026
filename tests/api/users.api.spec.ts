import {test, expect, request, APIRequestContext} from '@playwright/test'


const AUTH_TOKEN = {Authorization: `Bearer ${process.env.API_TOKEN}`}

test('get user test', async ({page, request}) => {
    const response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    //console.log(response);
    const jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    expect(response.status()).toBe(200);
});

test('create a new user test', async ({page, request}) => {

  //JS Object
  const userData = {
    name: "uday",
    // email: await randomEmail(),
    email: `uday${Date.now()}@example.com`,
    gender: "male",
    status: "active"
  }  

    //JS Object to JSON -> Serialization
    const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });
    //console.log(response);
    const jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //201
    console.log(response.statusText()); //Created
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');
});


async function createUser(request: APIRequestContext): Promise<number> {
    const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: {
            name: "uday",
            email: `uday${Date.now()}${Math.floor(Math.random() * 100000)}@example.com`,
            gender: "male",
            status: "active"
        }
    });
    expect(response.status()).toBe(201);
    return (await response.json()).id;
}

async function randomEmail() {
    const randomNum = Math.floor(Math.random() * 10000);
    return `uday${randomNum}@example.com`;
}

test('update user test', async ({page, request}) => {

  //JS Object
  const userData = {
    name: "uday101",
    email: `uday${Date.now()}@example.com`,
    gender: "male",
    status: "inactive"
  }  

    const userId = await createUser(request);

    //JS Object to JSON -> Serialization
    const response = await request.put(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: AUTH_TOKEN,
        data: userData
    });
    //console.log(response);
    const jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //200
    console.log(response.statusText()); //OK

    expect(jsonBody.name).toBe(userData.name);
    expect(jsonBody.email).toBe(userData.email);
    expect(jsonBody.gender).toBe(userData.gender);
    expect(jsonBody.status).toBe(userData.status);

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
});


test('delete user test', async ({page, request}) => {

    const userId = await createUser(request);

    const response = await request.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(204);
    
    
});
