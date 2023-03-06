import { json } from '@sveltejs/kit';

export async function GET({ request }) {
  // const { email, password } = await request.json();
  // console.log('email', email);
  // console.log('password', password);
  console.log('request', request);


  // return json(a + b);
  return json('custom');
}

export async function POST({ request, locals }) {
  console.log(request);


  const { email, password } = await request.json();
  console.log('email', email);
  console.log('password', password);
  const response = await locals.pb.collection('users').authWithPassword(email, password)
  console.log(response);


  // return json(a + b);
  return new Response('custom response');

}