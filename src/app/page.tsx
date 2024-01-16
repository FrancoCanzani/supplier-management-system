'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AuthenticationPage() {
  const { data: session } = useSession();
  console.log(session?.user?.id);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className='flex h-screen'>
      <div className='relative hidden lg:block lg:w-1/2 h-screen'>
        <Image
          src='/vessel.jpg'
          alt='Vessel'
          fill
          priority
          quality={100}
          className='object-cover object-[-16px] sm:object-center'
        />
      </div>
      <div className='mx-auto flex flex-col justify-center space-y-6 w-full lg:w-1/2'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Sign In to your account
          </h1>
        </div>
        <button onClick={() => signIn()}>Sign in</button>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          By clicking continue, you agree to our{' '}
          <Link
            href={'#'}
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={'#'}
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
