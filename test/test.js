const test = require('ava');
const request = require('supertest')
const app = require('../src/index')


const Script = require('..');
const { beforeEach, afterEach } = require('./helpers');

test.beforeEach(beforeEach);
test.afterEach(afterEach);

test('returns itself', t => {
  t.true(t.context.script instanceof Script);
});

test('sets a config object', t => {
  const script = new Script(false);
  t.true(script instanceof Script);
});

test('renders name', t => {
  const { script } = t.context;
  t.is(script.renderName(), 'script');
});

test('sets a default name', t => {
  const { script } = t.context;
  t.is(script._name, 'script');
});

test('User Registration', async t=>{
  const email = 'test123@mail.com'
  const password = 'test123'
  const response = await request(app)
  .post('/user/register').send({email,password})
  t.is(response.status, 200)
  t.is(response.body.message, 'User Registered Successfully')
})

test('Reset Password', async t=>{
  const email = 'test123@mail.com'
  const response = await request(app)
  .post('/reset/password').send({email})
  t.is(response.status, 200)
  t.is(response.body.message, 'Reset link sent successfully')
})
