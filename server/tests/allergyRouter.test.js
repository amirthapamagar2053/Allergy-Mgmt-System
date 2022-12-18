const supertest = require("supertest");
const app = require("../app");
const Allergy = require("../models/allergy");
const api = supertest(app);
let token = "";

beforeEach(async () => {
  const user = {
    email: "test@gmail.com",
    password: "password",
  };
  const response = await api
    .post("/api/Signin")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  token = response.body.token;
  await Allergy.deleteMany({});
  const newAllergy = [
    {
      name: "newAllergy1",
      severity: "Grade IV",
      symptoms: ["Fever", "Rashes"],
      highRisk: true,
      user: response.body.id,
    },
    {
      name: "newAllergy2",
      severity: "Grade V",
      symptoms: ["Heart Attack", "Rashes"],
      highRisk: false,
      user: response.body.id,
    },
  ];

  await Allergy.insertMany(newAllergy);
});

describe("/api/Allergies", () => {
  test("return all practitioners", async () => {
    const response = await api
      .get("/api/Allergies")
      .set("authorization", "bearer " + token);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe("newAllergy1");
  });
});

test("add a allergy", async () => {
  const user = {
    email: "test@gmail.com",
    password: "password",
  };
  const response = await api
    .post("/api/Signin")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const newAllergy = {
    name: "newAllergy3",
    severity: "Grade III",
    symptoms: `Fever, Rashes,Heart Attack`,
    highRisk: true,
    user: response.body.id,
  };

  await api
    .post("/api/Allergies")
    .send(newAllergy)
    .set("authorization", "bearer " + token)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const allAllergies = await Allergy.find({});
  expect(allAllergies).toHaveLength(3);
  const names = allAllergies.map((allergy) => allergy.name);
  expect(names).toContain("newAllergy3");
});

test("dont add practitioner if email already exists", async () => {
  const user = {
    email: "test@gmail.com",
    password: "password",
  };
  const responseuser = await api
    .post("/api/Signin")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const newAllergy = {
    name: "newAllergy1",
    severity: "Grade III",
    symptoms: `Fever, Rashes,Heart Attack`,
    highRisk: true,
    user: responseuser.body.id,
  };

  const response = await api
    .post("/api/Allergies")
    .send(newAllergy)
    .set("authorization", "bearer " + token)
    .expect(400);
  expect(response.body.error).toContain("The allergy exists");
});

test("update a practitioner", async () => {
  const user = {
    email: "test@gmail.com",
    password: "password",
  };
  const responseuser = await api
    .post("/api/Signin")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const updatedAllergy = {
    name: "newAllergy1",
    severity: "Grade VII",
    symptoms: `"Fever", "Rashes"`,
    highRisk: false,
    user: responseuser.body.id,
  };

  const updatingAllergy = await Allergy.findOne({ name: updatedAllergy.name });
  await api
    .put("/api/Allergies/" + updatingAllergy.id)
    .send(updatedAllergy)
    .set("authorization", "bearer " + token)
    .expect(203);
  const changedAllergy = await Allergy.findOne({ name: updatedAllergy.name });

  expect(changedAllergy.severity).toContain("Grade VII");
  const practitionersAtEnd = await Allergy.find({});
  expect(practitionersAtEnd).toHaveLength(2);
});

test("delete a practitioner", async () => {
  const allAllergy = await Allergy.find({});
  await api
    .delete("/api/Allergies/" + allAllergy[0]._id)
    .set("authorization", "bearer " + token)
    .expect(204);
  const deletedAllergy = await Allergy.findById(allAllergy[0]._id);
  expect(deletedAllergy).toBeNull();
  const newupdatedAllergy = await Allergy.find({});
  expect(newupdatedAllergy).toHaveLength(1);
});
