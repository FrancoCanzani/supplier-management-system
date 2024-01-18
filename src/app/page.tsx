'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';

export default function AuthenticationPage() {
  return (
    <main className='flex flex-col lg:flex-row h-screen'>
      <div className='relative h-1/2 lg:w-1/2 lg:h-screen'>
        <Image
          src='/vessel.jpg'
          alt='Vessel'
          fill
          priority
          quality={100}
          className='object-cover lg:object-[-16px] sm:object-center'
        />
      </div>
      <div className='mx-auto flex flex-col h-1/2 lg:w-1/2 lg:h-screen justify-center items-center space-y-6 w-full'>
        <h1 className='text-4xl lg:text-5xl mb-8 text-center font-semibold tracking-tight'>
          Supplier Management System
        </h1>
        <SignInButton mode='modal'>
          <Button
            variant={'link'}
            className='text-2xl font-semibold tracking-tight'
          >
            Sign In to your account ↗
          </Button>
        </SignInButton>{' '}
        <p className='px-8 max-w-4xl text-center text-sm text-muted-foreground'>
          By clicking, you agree to our{' '}
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
