import { redirect } from 'next/navigation';

export default function Page() {
  // En cuanto alguien pisa esta página, lo empujamos al blog
  redirect('/biblioteca/blog');
}